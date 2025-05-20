import { computed, reactive, watch } from "vue";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  updateDoc,
  getDoc,
  writeBatch
} from "firebase/firestore";
import { db, auth } from "@js/auth/firebase.js";
import { showToast } from "@js/toast.js";
import { usePlantNotifications } from '@composables/usePlantNotifications';

export function usePlants(defaultItemsPerPage = 12) {
  // ==================== STATE MANAGEMENT ====================
  // Using Vue 3's reactive for better tracking
  const state = reactive({
    plants: [],
    loading: false,
    error: null,
    isAdding: false,
    isDeleting: false,
    lastDoc: null,
    noMoreResults: false,
    itemsPerPage: defaultItemsPerPage,
    filters: {
      searchTerm: "",
      greenhouseId: null,
    },
    sortBy: "name",
    cache: new Map(), // Cache for efficient data access
    lastFetch: 0, // Timestamp to optimize refetching
    // Add a version counter to force UI updates when needed
    version: 0
  });

  // ==================== LOOKUP TABLES ====================
  // Watering frequency text-to-days mapping
  const WATERING_FREQUENCY = {
    "Every day": 1,
    "Every 2 days": 2,
    "Every 3 days": 3, 
    "Every 5 days": 5,
    "Weekly": 7,
    "Every 2 weeks": 14,
    "Every 3 weeks": 21,
    "Monthly": 30
  };

  // Days-to-text mapping (reverse of above)
  const DAYS_TO_TEXT = {
    1: "Every day",
    2: "Every 2 days",
    3: "Every 3 days",
    5: "Every 5 days",
    7: "Weekly",
    14: "Every 2 weeks",
    21: "Every 3 weeks",
    30: "Monthly"
  };

  // Status mapping for different care events
  const STATUS_MAP = {
    Watered: "healthy",
    Fertilised: "growing",
    Pruned: "healthy",
    Repotted: "growing"
  };

  // ==================== UTILITY FUNCTIONS ====================
  // Generic normalized date getter
  const getNormalizedDate = (dateInput) => {
    if (!dateInput) return null;
    
    try {
      if (dateInput.seconds) {
        return new Date(dateInput.seconds * 1000);
      }
      if (dateInput._methodName === "serverTimestamp" || dateInput.type === "server_timestamp") {
        return new Date();
      }
      if (dateInput instanceof Date) {
        return dateInput;
      }
      if (typeof dateInput === "string" || typeof dateInput === "number") {
        const parsed = new Date(dateInput);
        return isNaN(parsed.getTime()) ? null : parsed;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Extract days from watering schedule text
  const getDaysFromSchedule = (scheduleText) => {
    if (!scheduleText) return 7; // Default to weekly
    
    // Direct lookup from table
    if (WATERING_FREQUENCY[scheduleText]) {
      return WATERING_FREQUENCY[scheduleText];
    }
    
    // Try to extract from text pattern
    const daysMatch = scheduleText.match(/\d+/);
    if (daysMatch) {
      let days = parseInt(daysMatch[0], 10);
      if (scheduleText.toLowerCase().includes("week")) {
        days *= 7;
      }
      return days;
    }
    
    return 7; // Default weekly
  };

  // Get watering schedule text from days
  const getWateringScheduleText = (days) => {
    if (!days) return "Not specified";
    
    // Direct lookup from table
    return DAYS_TO_TEXT[days] || `Every ${days} days`;
  };

  // Format date for display, with consistent handling
  const formatDate = (date, fallback = "Never") => {
    const normalizedDate = getNormalizedDate(date);
    if (!normalizedDate) return fallback;
    
    return normalizedDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Process plant data for consistent format
  const processPlantData = (id, data) => {
    // Normalize dates
    const lastWatered = getNormalizedDate(data.lastWatered);
    const lastFertilised = getNormalizedDate(data.lastFertilised);
    const createdAt = getNormalizedDate(data.createdAt) || new Date();
    const updatedAt = getNormalizedDate(data.updatedAt) || new Date();
    
    // Get watering date
    let wateringDate = getNormalizedDate(data.wateringDate);
    if (!wateringDate && lastWatered) {
      const days = data.waterFrequency || 7;
      wateringDate = new Date(lastWatered);
      wateringDate.setDate(wateringDate.getDate() + days);
    }
    
    // Calculate days until watering
    let daysUntilWatering = null;
    if (wateringDate) {
      const now = new Date();
      const diff = wateringDate.getTime() - now.getTime();
      daysUntilWatering = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    
    // Determine if needs water
    const needsWatering = daysUntilWatering !== null ? daysUntilWatering <= 0 : false;
    
    // Calculate days since fertilized
    let daysSinceFertilised = null;
    if (lastFertilised) {
      const now = new Date();
      const diff = now.getTime() - lastFertilised.getTime();
      daysSinceFertilised = Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    
    // Determine if needs fertilizer
    const needsFertilizing = daysSinceFertilised !== null ? 
      daysSinceFertilised >= (data.fertiliseFrequency || 30) : false;
    
    // Determine status
    let status = data.status || "healthy";
    if (needsWatering && status !== "needs water") {
      status = "needs water";
    }
    
    return {
      id,
      ...data,
      lastWatered,
      lastFertilised,
      wateringDate,
      createdAt,
      updatedAt,
      status,
      formattedLastWatered: lastWatered ? formatDate(lastWatered) : "Never",
      formattedLastFertilised: lastFertilised ? formatDate(lastFertilised) : "Never",
      daysUntilWatering,
      needsWatering,
      needsFertilizing,
      daysSinceFertilised
    };
  };

  // Create debounced function (executes after delay)
  const debounce = (fn, ms = 300) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), ms);
    };
  };

  // ==================== COMPUTED PROPERTIES ====================
  // Filter plants based on current filters
  const filteredPlants = computed(() => {
    // Force reactivity by using version
    const version = state.version;
    
    let arr = [...state.plants];
    
    // Create cache key based on filters and version
    const cacheKey = `filter:${state.filters.greenhouseId}:${state.filters.searchTerm}:${version}`;
    
    // Check if we have this in cache
    if (state.cache.has(cacheKey)) {
      return state.cache.get(cacheKey);
    }
    
    // Filter by greenhouse
    if (state.filters.greenhouseId && state.filters.greenhouseId !== "") {
      arr = arr.filter(p => p.greenhouseId === state.filters.greenhouseId);
    }
    
    // Filter by search term
    if (state.filters.searchTerm && state.filters.searchTerm.trim() !== "") {
      const term = state.filters.searchTerm.trim().toLowerCase();
      arr = arr.filter(p =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.type && p.type.toLowerCase().includes(term)) ||
        (p.notes && p.notes.toLowerCase().includes(term))
      );
    }
    
    // Cache result with version number included
    state.cache.set(cacheKey, arr);
    return arr;
  });

  // Sort plants based on current sort setting
  const sortedPlants = computed(() => {
    // Force reactivity by using version - crucial to make this work!
    const version = state.version;
    
    // Create cache key based on filter results and sort and version
    const cacheKey = `sort:${state.sortBy}:${state.filters.greenhouseId}:${state.filters.searchTerm}:${version}`;
    
    // Check if we have this in cache
    if (state.cache.has(cacheKey)) {
      return state.cache.get(cacheKey);
    }
    
    // Clone to avoid mutating source
    let arr = [...filteredPlants.value];
    
    // Apply sorting
    switch (state.sortBy) {
      case "name":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
        
      case "name-desc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
        
      case "created":
        arr.sort((a, b) => {
          // Handle different timestamp formats
          const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return bTime - aTime; // Newest first
        });
        break;
        
      case "created-asc":
        arr.sort((a, b) => {
          // Handle different timestamp formats
          const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return aTime - bTime; // Oldest first
        });
        break;
        
      case "needs-water":
        arr.sort((a, b) => {
          // Sort by watering needs (needs water first)
          if (a.needsWatering && !b.needsWatering) return -1;
          if (!a.needsWatering && b.needsWatering) return 1;
          
          // Secondary sort by days until watering
          if (a.daysUntilWatering !== null && b.daysUntilWatering !== null) {
            return a.daysUntilWatering - b.daysUntilWatering;
          }
          
          return 0;
        });
        break;
    }
    
    // Cache result with version in the key
    state.cache.set(cacheKey, arr);
    return arr;
  });

  // ==================== EVENT HANDLERS ====================
  // Set sort field
  const setSortBy = (val) => {
    if (val !== state.sortBy) {
      state.sortBy = val;
      // Clear related cache entries
      for (const key of state.cache.keys()) {
        if (key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
    }
  };

  // Update filters
  const setFilters = (newFilters) => {
    const oldFilters = { ...state.filters };
    state.filters = { ...state.filters, ...newFilters };
    
    // Clear related cache entries if filters changed
    if (JSON.stringify(oldFilters) !== JSON.stringify(state.filters)) {
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
    }
  };

  // Handle search input
  const handleSearch = debounce((searchTerm) => {
    setFilters({ searchTerm });
  }, 300);

  // Handle greenhouse filter
  const handleFilterByGreenhouse = (greenhouseId) => {
    setFilters({ greenhouseId });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ greenhouseId: null, searchTerm: "" });
  };

  // ==================== DATA FETCHING ====================
  // Fetch plants from Firestore with caching
  const fetchPlants = async (loadMore = false) => {
    // Don't fetch if already loading or no more results in pagination
    if (state.loading && !loadMore) return;
    if (loadMore && state.noMoreResults) return;
    
    // Set loading state
    if (!loadMore) {
      state.loading = true;
      state.error = null;
    }

    try {
      // Check authentication
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view plants");
      }

      const userId = auth.currentUser.uid;
      const userPlantsRef = collection(db, `userData/${userId}/plants`);
      
      // Base query with ordering
      let plantsQuery = query(
        userPlantsRef,
        orderBy('createdAt', 'desc'),
        limit(state.itemsPerPage)
      );
      
      // Add startAfter if loading more
      if (loadMore && state.lastDoc) {
        plantsQuery = query(
          userPlantsRef,
          orderBy('createdAt', 'desc'),
          startAfter(state.lastDoc),
          limit(state.itemsPerPage)
        );
      }
      
      // Apply greenhouse filter if selected
      if (state.filters.greenhouseId) {
        plantsQuery = query(
          userPlantsRef,
          where('greenhouseId', '==', state.filters.greenhouseId),
          orderBy('createdAt', 'desc'),
          limit(state.itemsPerPage)
        );
        
        if (loadMore && state.lastDoc) {
          plantsQuery = query(
            userPlantsRef,
            where('greenhouseId', '==', state.filters.greenhouseId),
            orderBy('createdAt', 'desc'),
            startAfter(state.lastDoc),
            limit(state.itemsPerPage)
          );
        }
      }
      
      // Execute query
      const querySnapshot = await getDocs(plantsQuery);
      
      // Update pagination state
      const docs = querySnapshot.docs;
      state.lastDoc = docs.length > 0 ? docs[docs.length - 1] : null;
      state.noMoreResults = docs.length < state.itemsPerPage;

      // Process plant data
      const plantsData = querySnapshot.docs.map(doc => 
        processPlantData(doc.id, doc.data())
      );

      // Update state based on load type
      if (loadMore) {
        // Avoid duplicates when appending
        const existingIds = new Set(state.plants.map(p => p.id));
        const newPlants = plantsData.filter(p => !existingIds.has(p.id));
        state.plants = [...state.plants, ...newPlants];
      } else {
        state.plants = plantsData;
      }
      
      // Record fetch time
      state.lastFetch = Date.now();
      
      // Clear relevant cached results
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
      
      return plantsData;
    } catch (err) {
      console.error("Error fetching plants: ", err);
      state.error = "Unable to load plants. Please try again later.";
      showToast("Unable to load plants. Please try again later.", "error");
      return [];
    } finally {
      state.loading = false;
    }
  };

  // Get a single plant by ID with caching
  const getPlantById = async (plantId) => {
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view plant details");
      }

      // Check cache first
      const cacheKey = `plant:${plantId}`;
      const cachedData = state.cache.get(cacheKey);
      const now = Date.now();
      
      // Use cache if recent (< 30 seconds old)
      if (cachedData && (now - cachedData.timestamp < 30000)) {
        return cachedData.data;
      }
      
      // Not in cache, fetch from Firestore
      const userId = auth.currentUser.uid;
      const docRef = doc(db, `userData/${userId}/plants`, plantId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Plant not found");
      }

      // Process data for consistent format
      const plantData = processPlantData(docSnap.id, docSnap.data());
      
      // Update status if needed
      if (plantData.needsWatering && plantData.status !== "needs water") {
        plantData.status = "needs water";
        
        // Update in Firestore (don't await to avoid blocking)
        updateDoc(docRef, {
          status: "needs water",
          updatedAt: serverTimestamp(),
        }).catch(e => console.error("Error updating plant status:", e));
      }
      
      // Cache the result
      state.cache.set(cacheKey, {
        data: plantData,
        timestamp: now
      });
      
      return plantData;
    } catch (err) {
      console.error("Error fetching plant: ", err);
      throw err;
    }
  };

  // ==================== MUTATIONS ====================
  // Add a new plant
  const addPlant = async (plantData) => {
    state.isAdding = true;
    state.error = null;
    
    try {
      // Validate required fields
      if (!plantData.name?.trim()) {
        throw new Error("Plant name is required");
      }

      // Check authentication
      if (!auth.currentUser) {
        throw new Error("You must be logged in to add a plant");
      }

      // Calculate watering date
      const daysToAdd = plantData.waterFrequency || 7;
      const wateringDate = new Date();
      wateringDate.setDate(wateringDate.getDate() + daysToAdd);
      
      // Get watering schedule text
      const wateringSchedule = getWateringScheduleText(daysToAdd);

      // Current timestamp as Date object (for UI)
      const now = new Date();
      const userId = auth.currentUser.uid;
      
      // Clean greenhouse ID
      const greenhouseId = plantData.greenhouseId?.trim() || null;
      
      // Prepare data for Firestore
      const newPlantData = {
        name: plantData.name.trim(),
        type: plantData.type?.trim() || "",
        notes: plantData.notes?.trim() || "",
        waterFrequency: daysToAdd,
        fertiliseFrequency: plantData.fertiliseFrequency || 30,
        greenhouseId,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastWatered: serverTimestamp(),
        lastFertilised: serverTimestamp(),
        wateringSchedule,
        wateringDate, 
        status: "healthy"
      };

      // Create optimistic local version
      const optimisticId = `temp-${Date.now()}`;
      const optimisticPlant = processPlantData(optimisticId, {
        ...newPlantData,
        createdAt: now,
        updatedAt: now,
        lastWatered: now,
        lastFertilised: now,
        pending: true
      });
      
      // Add to local state - use spread operator for better reactivity
      state.plants = [optimisticPlant, ...state.plants];
      // Increment version to force computed reactivity
      state.version++;

      // Add to Firestore
      const userPlantsRef = collection(db, `userData/${userId}/plants`);
      const docRef = await addDoc(userPlantsRef, newPlantData);
      const newPlantId = docRef.id;

      // Update greenhouse relationship if specified
      if (greenhouseId) {
        await updateGreenhousePlantRelationship(newPlantId, greenhouseId);
      }

      // Replace optimistic entry with real one
      const realPlant = processPlantData(newPlantId, {
        ...newPlantData,
        createdAt: now,
        updatedAt: now,
        lastWatered: now,
        lastFertilised: now
      });
      
      // Update local state with a new array for better reactivity
      const index = state.plants.findIndex(p => p.id === optimisticId);
      if (index !== -1) {
        const newArray = [...state.plants];
        newArray.splice(index, 1, realPlant);
        state.plants = newArray;
      }
      
      // Cache the new plant
      state.cache.set(`plant:${newPlantId}`, {
        data: realPlant,
        timestamp: Date.now()
      });
      
      // Force reactivity update
      state.version++;
      
      showToast("Plant added successfully", "success");
      return realPlant;
    } catch (err) {
      console.error("Error adding plant: ", err);
      
      // Remove optimistic entry with a new array for reactivity
      state.plants = state.plants.filter(p => !p.pending);
      state.version++;
      
      state.error = err.message || "Unable to add plant. Please try again later.";
      showToast(state.error, "error");
      throw err;
    } finally {
      state.isAdding = false;
    }
  };

  // Update plant with optimistic UI updates
  const updatePlant = async (plantId, updateData) => {
    // Store original state for reversion if needed
    let originalState = null;
    const index = state.plants.findIndex(p => p.id === plantId);
    
    if (index !== -1) {
      // Create a deep copy of the plant to restore if needed
      originalState = { 
        index, 
        plant: JSON.parse(JSON.stringify(state.plants[index])) 
      };
    }
    
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to update a plant");
      }

      // Prepare update data
      const cleanUpdateData = { ...updateData };
      
      // Calculate watering date if schedule provided
      if (cleanUpdateData.wateringSchedule) {
        const daysToAdd = getDaysFromSchedule(cleanUpdateData.wateringSchedule);
        const wateringDate = new Date();
        wateringDate.setDate(wateringDate.getDate() + daysToAdd);
        cleanUpdateData.wateringDate = wateringDate;
      }

      // Add updatedAt timestamp
      cleanUpdateData.updatedAt = serverTimestamp();
      
      const userId = auth.currentUser.uid;
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      
      // Optimistic UI update
      if (index !== -1) {
        const newArray = [...state.plants];
        const jsUpdateData = {
          ...cleanUpdateData,
          updatedAt: new Date()
        };
        
        const updatedPlant = processPlantData(plantId, {
          ...state.plants[index],
          ...jsUpdateData
        });
        
        newArray[index] = updatedPlant;
        state.plants = newArray;
        state.version++;
      }
      
      // Update in Firestore
      await updateDoc(plantRef, cleanUpdateData);
      
      // Clear caches and force reactivity updates
      state.cache.delete(`plant:${plantId}`);
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
      state.version++;
      
      return true;
    } catch (err) {
      console.error("Error updating plant: ", err);
      
      // Revert optimistic update if we have original data
      if (originalState) {
        const newArray = [...state.plants];
        newArray[originalState.index] = originalState.plant;
        state.plants = newArray;
        state.version++;
      }
      
      state.error = err.message || "Unable to update plant. Please try again later.";
      showToast(state.error, "error");
      throw err;
    }
  };

    const updateLocalPlant = (updatedPlant) => {
    if (!updatedPlant || !updatedPlant.id) return false;
    
    const index = state.plants.findIndex(p => p.id === updatedPlant.id);
    if (index !== -1) {
      // Create a new array to ensure reactivity
      const newPlants = [...state.plants];
      newPlants[index] = { 
        ...newPlants[index], 
        ...updatedPlant,
        // Ensure these are properly formatted
        formattedLastWatered: formatDate(updatedPlant.lastWatered || newPlants[index].lastWatered),
        formattedLastFertilised: formatDate(updatedPlant.lastFertilised || newPlants[index].lastFertilised)
      };
      
      // Update state with the new array
      state.plants = newPlants;
      
      // Clear related caches and force reactivity update
      state.cache.delete(`plant:${updatedPlant.id}`);
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
      state.version++;
      
      return true;
    }
    
    return false;
  }

  // Comprehensive plant update with greenhouse relationship changes
  const updatePlantDetails = async (plantId, updateData) => {
    // Store original state for reversion if needed
    let originalState = null;
    const index = state.plants.findIndex(p => p.id === plantId);
    
    if (index !== -1) {
      // Create a deep copy of the plant to restore if needed
      originalState = { 
        index, 
        plant: JSON.parse(JSON.stringify(state.plants[index])) 
      };
    }
    
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to update a plant");
      }
      
      // Get current plant data to check for changes
      const userId = auth.currentUser.uid;
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      const plantSnap = await getDoc(plantRef);
      
      if (!plantSnap.exists()) {
        throw new Error("Plant not found");
      }
      
      const currentPlantData = plantSnap.data();
      const oldGreenhouseId = currentPlantData.greenhouseId || null;
      const newGreenhouseId = updateData.greenhouseId === "" ? null : updateData.greenhouseId;
      
      // Clean update data
      const cleanUpdateData = { ...updateData };
      
      // Empty string becomes null for greenhouseId
      if (cleanUpdateData.greenhouseId === "") {
        cleanUpdateData.greenhouseId = null;
      }
      
      // Calculate watering date if schedule provided
      if (cleanUpdateData.wateringSchedule) {
        const daysToAdd = getDaysFromSchedule(cleanUpdateData.wateringSchedule);
        const wateringDate = new Date();
        wateringDate.setDate(wateringDate.getDate() + daysToAdd);
        cleanUpdateData.wateringDate = wateringDate;
      }

      // Add updatedAt timestamp
      cleanUpdateData.updatedAt = serverTimestamp();
      
      // Optimistic UI update
      if (index !== -1) {
        const newArray = [...state.plants];
        const jsUpdateData = {
          ...cleanUpdateData,
          updatedAt: new Date()
        };
        
        const updatedPlant = processPlantData(plantId, {
          ...state.plants[index],
          ...jsUpdateData
        });
        
        newArray[index] = updatedPlant;
        state.plants = newArray;
        state.version++;
      }
      
      // Update in Firestore
      await updateDoc(plantRef, cleanUpdateData);
      
      // Update greenhouse relationship if changed
      if (oldGreenhouseId !== newGreenhouseId) {
        await updateGreenhousePlantRelationship(plantId, newGreenhouseId, oldGreenhouseId);
      }
      
      // Clear plant from cache
      state.cache.delete(`plant:${plantId}`);
      
      return true;
    } catch (err) {
      console.error("Error updating plant details: ", err);
      
      // Revert optimistic update if we have original data
      if (originalState) {
        const newArray = [...state.plants];
        newArray[originalState.index] = originalState.plant;
        state.plants = newArray;
        state.version++;
      }
      
      state.error = err.message || "Unable to update plant. Please try again later.";
      showToast(state.error, "error");
      throw err;
    }
  };

  // Delete a plant
  const deletePlant = async (plantId) => {
    state.isDeleting = true;
    state.error = null;
    
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to delete a plant");
      }

      const userId = auth.currentUser.uid;
      
      // Find in local state for name and optimistic update
      const index = state.plants.findIndex(p => p.id === plantId);
      let plantName = "Plant";
      let greenhouseId = null;
      
      if (index !== -1) {
        // Store info before removing
        plantName = state.plants[index].name;
        greenhouseId = state.plants[index].greenhouseId;
        
        // Optimistic removal with new array for reactivity
        state.plants = state.plants.filter(p => p.id !== plantId);
        state.version++;
      } else {
        // Not in local state, get from Firestore
        const plantRef = doc(db, `userData/${userId}/plants`, plantId);
        const plantSnap = await getDoc(plantRef);
        
        if (plantSnap.exists()) {
          const data = plantSnap.data();
          plantName = data.name;
          greenhouseId = data.greenhouseId;
        } else {
          throw new Error("Plant not found");
        }
      }
      
      // Update greenhouse relationship if needed
      if (greenhouseId) {
        await updateGreenhousePlantRelationship(plantId, null, greenhouseId);
      }

      // Delete from Firestore
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      await deleteDoc(plantRef);
      
      // Clear from cache and force reactivity updates
      state.cache.delete(`plant:${plantId}`);
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
      state.version++;
      
      showToast(`"${plantName}" deleted successfully`, "success");
      return true;
    } catch (err) {
      console.error("Error deleting plant: ", err);
      
      // Revert optimistic delete by refetching
      await fetchPlants();
      state.version++;
      
      state.error = err.message || "Unable to delete plant. Please try again later.";
      showToast(state.error, "error");
      throw err;
    } finally {
      state.isDeleting = false;
    }
  };

  // Record care events (watering, fertilizing, etc)
  const recordCareEvent = async (plantId, eventType) => {
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to record care events");
      }

      const userId = auth.currentUser.uid;
      const now = new Date();
      const event = { type: eventType, timestamp: now };

      // Get current plant data
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      
      // Check cache first
      const cacheKey = `plant:${plantId}`;
      let plantData;
      const cachedPlant = state.cache.get(cacheKey);
      
      if (cachedPlant && (Date.now() - cachedPlant.timestamp < 30000)) {
        plantData = cachedPlant.data;
      } else {
        // Fetch from Firestore
        const plantSnap = await getDoc(plantRef);
        if (!plantSnap.exists()) {
          throw new Error("Plant not found");
        }
        plantData = plantSnap.data();
      }

      // Create/update the careEvents array
      const careEvents = plantData.careEvents || [];
      careEvents.unshift(event);

      // Base update object for Firestore
      const updateData = {
        careEvents,
        lastCareEvent: event,
        status: STATUS_MAP[eventType] || plantData.status,
        updatedAt: serverTimestamp(),
      };

      // Create JS Date version for UI updates
      const uiUpdateData = {
        careEvents,
        lastCareEvent: event,
        status: STATUS_MAP[eventType] || plantData.status,
        updatedAt: now,
      };

      // Add event-specific fields
      if (eventType === "Watered") {
        // Get days from watering schedule
        const daysToAdd = plantData.waterFrequency || 7;
        
        // Calculate next watering date
        const wateringDate = new Date();
        wateringDate.setDate(wateringDate.getDate() + daysToAdd);

        // Add to Firestore update
        updateData.status = "healthy"; // Reset status
        updateData.wateringDate = wateringDate;
        updateData.lastWatered = serverTimestamp();
        updateData.wateringReminderFired = false; // Reset notification flag
        
        // Add to UI update data
        uiUpdateData.status = "healthy";
        uiUpdateData.wateringDate = wateringDate;
        uiUpdateData.lastWatered = now;
        uiUpdateData.wateringReminderFired = false;
      } else if (eventType === "Fertilised") {
        updateData.lastFertilised = serverTimestamp();
        uiUpdateData.lastFertilised = now;
        updateData.fertiliserReminderSent = false; // Reset notification flag
        
        // Add to UI update data
        uiUpdateData.fertiliserReminderSent = false;
      }

      // Find plant in local state for optimistic update
      const index = state.plants.findIndex(p => p.id === plantId);
      if (index !== -1) {
        // Create a new array for better reactivity
        const newArray = [...state.plants];
        const updatedPlant = processPlantData(plantId, {
          ...state.plants[index],
          ...uiUpdateData
        });
        
        // Apply the update optimistically
        newArray[index] = updatedPlant;
        state.plants = newArray;
        state.version++;
      }

      // Update in Firestore
      await updateDoc(plantRef, updateData);
      
      // Clear caches
      state.cache.delete(`plant:${plantId}`);
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
      state.version++;

      // Show toast with plant name
      showToast(
        `"${plantData.name}" ${eventType.toLowerCase()} successfully`,
        "success"
      );

      // Return updated plant data
      return processPlantData(plantId, {
        ...plantData,
        ...uiUpdateData
      });
    } catch (err) {
      console.error("Error recording care event: ", err);
      showToast("Unable to record care event. Please try again later.", "error");
      throw err;
    }
  };

  // Update the relationship between plant and greenhouse
  const updateGreenhousePlantRelationship = async (plantId, newGreenhouseId, oldGreenhouseId = null) => {
    try {
      const userId = auth.currentUser.uid;
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      
      // Use a batch for more efficient updates
      const batch = writeBatch(db);
      
      // Remove from old greenhouse if specified
      if (oldGreenhouseId) {
        const oldGreenhouseRef = doc(db, `userData/${userId}/greenhouses`, oldGreenhouseId);
        const oldGreenhouseSnap = await getDoc(oldGreenhouseRef);
        
        if (oldGreenhouseSnap.exists()) {
          const oldGreenhouseData = oldGreenhouseSnap.data();
          const plants = oldGreenhouseData.plants || [];
          
          // Remove plant from array
          const plantPath = `userData/${userId}/plants/${plantId}`;
          const updatedPlants = plants.filter(plant => {
            if (plant.path) return plant.path !== plantPath;
            if (plant.id) return plant.id !== plantId;
            return plant !== plantId;
          });
          
          // Add to batch
          batch.update(oldGreenhouseRef, {
            plants: updatedPlants,
            updatedAt: serverTimestamp()
          });
        }
      }
      
      // Add to new greenhouse if specified
      if (newGreenhouseId) {
        const newGreenhouseRef = doc(db, `userData/${userId}/greenhouses`, newGreenhouseId);
        const newGreenhouseSnap = await getDoc(newGreenhouseRef);
        
        if (newGreenhouseSnap.exists()) {
          const newGreenhouseData = newGreenhouseSnap.data();
          const plants = newGreenhouseData.plants || [];
          
          // Check if plant is already in array
          const plantPath = `userData/${userId}/plants/${plantId}`;
          const alreadyExists = plants.some(plant => {
            if (plant.path) return plant.path === plantPath;
            if (plant.id) return plant.id === plantId;
            return plant === plantId;
          });
          
          // Only add if not already present
          if (!alreadyExists) {
            // Add plant reference
            plants.push(plantRef);
            
            // Add to batch
            batch.update(newGreenhouseRef, {
              plants,
              updatedAt: serverTimestamp()
            });
          }
        }
      }
      
      // Commit all changes in a single batch
      await batch.commit();
      return true;
    } catch (err) {
      console.error("Error updating greenhouse-plant relationship:", err);
      // Don't throw to avoid blocking the main operation
      return false;
    }
  };

  // Get plants without a greenhouse
  const getPlantsWithoutGreenhouse = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view plants");
      }
      
      // Check cache first
      const cacheKey = "plants-without-greenhouse";
      const cachedData = state.cache.get(cacheKey);
      
      if (cachedData && (Date.now() - cachedData.timestamp < 30000)) {
        return cachedData.data;
      }
      
      // Not in cache, fetch from Firestore
      const userId = auth.currentUser.uid;
      const userPlantsRef = collection(db, `userData/${userId}/plants`);
      
      // Query for plants without greenhouse
      const plantsQuery = query(
        userPlantsRef,
        where("greenhouseId", "==", null)
      );
      
      const querySnapshot = await getDocs(plantsQuery);
      
      // Process plants with consistent format
      const plants = querySnapshot.docs.map(doc => 
        processPlantData(doc.id, doc.data())
      );
      
      // Cache the result
      state.cache.set(cacheKey, {
        data: plants,
        timestamp: Date.now()
      });
      
      return plants;
    } catch (err) {
      console.error("Error fetching plants without greenhouse:", err);
      throw err;
    }
  };

  // ==================== HELPER FUNCTIONS ====================
  // Check if plant needs water
  const needsWater = (plant) => {
    if (!plant) return false;
    
    // Use pre-computed property if available
    if (plant.needsWatering !== undefined) {
      return plant.needsWatering;
    }
    
    // Check watering date if available
    if (plant.wateringDate) {
      const wateringDate = getNormalizedDate(plant.wateringDate);
      if (wateringDate) {
        return new Date() > wateringDate;
      }
    }
    
    // Otherwise check based on days since watering
    if (!plant.lastWatered) return true;
    
    const lastWatered = getNormalizedDate(plant.lastWatered);
    if (!lastWatered) return false;
    
    const now = new Date();
    const daysSinceWatered = Math.floor((now - lastWatered) / (1000 * 60 * 60 * 24));
    return daysSinceWatered >= (plant.waterFrequency || 7);
  };

  // Check if plant needs fertilizer
  const needsFertiliser = (plant) => {
    if (!plant) return false;
    
    // Use pre-computed property if available
    if (plant.needsFertilizing !== undefined) {
      return plant.needsFertilizing;
    }
    
    if (!plant.lastFertilised) return true;
    
    const lastFertilised = getNormalizedDate(plant.lastFertilised);
    if (!lastFertilised) return false;
    
    const now = new Date();
    const daysSinceFertilised = Math.floor((now - lastFertilised) / (1000 * 60 * 60 * 24));
    return daysSinceFertilised >= (plant.fertiliseFrequency || 30);
  };

  // Format last watered date
  const getLastWateredFormatted = (plant) => {
    if (!plant) return "Never";
    
    // Use pre-computed value if available
    if (plant.formattedLastWatered) {
      return plant.formattedLastWatered;
    }
    
    return formatDate(plant.lastWatered, "Never");
  };

  // Format last fertilised date
  const getLastFertilisedFormatted = (plant) => {
    if (!plant) return "Never";
    
    // Use pre-computed value if available
    if (plant.formattedLastFertilised) {
      return plant.formattedLastFertilised;
    }
    
    return formatDate(plant.lastFertilised, "Never");
  };

  // ==================== EVENT HANDLERS ====================
  // Water plant shorthand
  const handleWater = async (plant) => {
    return await recordCareEvent(plant.id, "Watered");
  };
  
  // Fertilize plant shorthand
  const handleFertilise = async (plant) => {
    return await recordCareEvent(plant.id, "Fertilised");
  };

  // Alternative naming for handlers
  const handleWaterPlant = async (plantId) => {
    try {
      const result = await handleWater(plantId);
      
      // After successfully watering, clear the notification
      const { clearPlantNotification } = usePlantNotifications();
      await clearPlantNotification(plantId, 'water');
      
      return result;
    } catch (error) {
      console.error("Error watering plant:", error);
      return false;
    }
  };

  const handleFertilisePlant = async (plantId) => {
    try {
      const result = await handleFertilise(plantId);
      
      // After successfully fertilising, clear the notification
      const { clearPlantNotification } = usePlantNotifications();
      await clearPlantNotification(plantId, 'fertiliser');
      
      return result;
    } catch (error) {
      console.error("Error fertilising plant:", error);
      return false;
    }
  };

  const handleUpdatePlant = updatePlant;

  // Reset state
  const reset = () => {
    state.plants = [];
    state.loading = false;
    state.error = null;
    state.isAdding = false;
    state.isDeleting = false;
    state.lastDoc = null;
    state.noMoreResults = false;
    state.filters = {
      greenhouseId: null,
      searchTerm: '',
    };
    state.cache.clear();
  };

  // ==================== WATCH FILTERS FOR AUTO-UPDATES ====================
  // Watch for filter changes to trigger search
  watch(() => state.filters, (newFilters, oldFilters) => {
    // Only check if initialized and actually changed
    if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters) && state.plants.length > 0) {
      // Clear relevant cache entries
      for (const key of state.cache.keys()) {
        if (key.startsWith('filter:') || key.startsWith('sort:')) {
          state.cache.delete(key);
        }
      }
    }
  }, { deep: true });

  // ==================== EXPORTS ====================
  return {
    // Create separate refs for key state items instead of all toRefs
    plants: computed(() => state.plants),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    isAdding: computed(() => state.isAdding),
    isDeleting: computed(() => state.isDeleting),
    noMoreResults: computed(() => state.noMoreResults),
    filters: computed(() => state.filters),
    sortBy: computed(() => state.sortBy),
    version: computed(() => state.version),
    
    // Expose computed properties
    filteredPlants,
    sortedPlants,
    
    // Methods remain the same...
    fetchPlants,
    getPlantById,
    addPlant,
    updatePlant,
    updatePlantDetails,
    deletePlant,
    recordCareEvent,
    updateGreenhousePlantRelationship,
    getPlantsWithoutGreenhouse,
    
    // Filter/sort operations
    setFilters,
    setSortBy,
    handleSearch,
    handleFilterByGreenhouse,
    clearFilters,
    
    // Format helpers
    getWateringScheduleText,
    getLastWateredFormatted,
    getLastFertilisedFormatted,
    needsWater,
    needsFertiliser,
    
    // Care handlers
    handleWater,
    handleFertilise,
    handleWaterPlant,
    handleFertilisePlant,
    handleUpdatePlant,
    
    // State management
    reset,
    
    // Update a plant in local state without a Firebase update
    updateLocalPlant,
  };
}