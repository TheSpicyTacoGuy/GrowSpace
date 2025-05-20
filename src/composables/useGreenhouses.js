import { computed, reactive, watch, ref } from "vue";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  writeBatch,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { db, auth } from "@js/auth/firebase.js";
import { showToast } from "/js/toast";

export function useGreenhouses(itemsPerPage = 50) {
  // Reactive state with defaults
  const state = reactive({
    greenhouses: [],
    loading: false,
    error: null,
    isAdding: false,
    isDeleting: false,
    lastDoc: null,
    noMoreResults: false,
    sortBy: "name",
    searchQuery: "",
    cache: new Map(), // Cache greenhouse details
    initialized: false,
    fetchTimestamp: 0, // Track last fetch time for cache invalidation
  });

  // Find where you define version and ensure it's a ref
  const version = ref(0); // Make sure it's initialized

  // Computed properties
  const sortedGreenhouses = computed(() => {
    // Use cached sorted results if available and state hasn't changed
    const cacheKey = `sorted-${state.sortBy}-${state.searchQuery}`;

    // Clone array to avoid mutation issues
    let arr = [...state.greenhouses];

    // Apply search filter if present
    if (state.searchQuery) {
      const searchLower = state.searchQuery.toLowerCase();
      arr = arr.filter(
        (greenhouse) =>
          greenhouse.name.toLowerCase().includes(searchLower) ||
          (greenhouse.description &&
            greenhouse.description.toLowerCase().includes(searchLower))
      );
    }

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
          const aTime = a.createdAt?.seconds ? a.createdAt.seconds : a.createdAt;
          const bTime = b.createdAt?.seconds ? b.createdAt.seconds : b.createdAt;
          return bTime - aTime;
        });
        break;
      case "created-asc":
        arr.sort((a, b) => {
          // Handle different timestamp formats
          const aTime = a.createdAt?.seconds ? a.createdAt.seconds : a.createdAt;
          const bTime = b.createdAt?.seconds ? b.createdAt.seconds : b.createdAt;
          return aTime - bTime;
        });
        break;
    }

    // Cache result
    state.cache.set(cacheKey, arr);
    return arr;
  });

  // Watch for search query changes to filter results
  watch(
    () => state.searchQuery,
    (newQuery) => {
      // Only trigger remote search when query has 3+ characters
      if (newQuery && newQuery.length >= 3 && state.initialized) {
        // Implement debounce to prevent too many searches
        const debounceTimer = setTimeout(() => {
          searchGreenhouses(newQuery);
        }, 300);

        return () => clearTimeout(debounceTimer);
      } else if (!newQuery && state.initialized) {
        // When search is cleared, return to initial data
        resetSearch();
      }
    }
  );

  // Set sort and maintain cache
  function setSortBy(val) {
    state.sortBy = val;
  }

  // Reset search and go back to default view
  function resetSearch() {
    state.searchQuery = "";
  }

  // Optimize fetch with caching and partial updates
  const fetchGreenhouses = async (loadMore = false, searchQuery = "") => {
    // Prevent duplicate requests
    if (state.loading && !loadMore) return;

    if (!loadMore) {
      state.loading = true;
      state.error = null;

      // Only reset pagination for new searches
      if (searchQuery !== state.searchQuery) {
        state.lastDoc = null;
        state.noMoreResults = false;
        state.searchQuery = searchQuery;
      }
    }

    try {
      // Check authentication
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view greenhouses");
      }

      const userId = auth.currentUser.uid;
      const userGreenhousesRef = collection(db, `userData/${userId}/greenhouses`);

      // Cache invalidation - if the data is recent (last 30 seconds), don't refetch
      const now = Date.now();
      const isCacheValid = (now - state.fetchTimestamp < 30000) && state.initialized;

      // Only proceed with fetch if cache is invalid or doing pagination
      if (!isCacheValid || loadMore || searchQuery) {
        let greenhouseQuery;

        // Create base query with proper ordering
        greenhouseQuery = query(
          userGreenhousesRef,
          orderBy("createdAt", "desc"),
          limit(itemsPerPage)
        );

        // If loading more, start after the last document
        if (loadMore && state.lastDoc) {
          greenhouseQuery = query(
            userGreenhousesRef,
            orderBy("createdAt", "desc"),
            startAfter(state.lastDoc),
            limit(itemsPerPage)
          );
        }

        const querySnapshot = await getDocs(greenhouseQuery);
        let greenhousesData = [];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          // Normalize plants as array
          if (!docData.plants || !Array.isArray(docData.plants)) {
            docData.plants = [];
          }

          greenhousesData.push({
            id: doc.id,
            formattedDate: new Date(docData.createdAt?.seconds * 1000).toLocaleDateString(),
            ...docData,
            // Add computed plant count property directly
            plantCount: Array.isArray(docData.plants) ? docData.plants.length : 0,
          });
        });

        // Filter locally if search query is present
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          greenhousesData = greenhousesData.filter(
            (greenhouse) =>
              greenhouse.name.toLowerCase().includes(searchLower) ||
              (greenhouse.description &&
                greenhouse.description.toLowerCase().includes(searchLower))
          );
        }

        // Update pagination tracker
        const docs = querySnapshot.docs;
        state.lastDoc = docs.length > 0 ? docs[docs.length - 1] : null;
        state.noMoreResults = docs.length < itemsPerPage;

        // Update state
        if (loadMore && !searchQuery) {
          // Append while avoiding duplicates
          const existingIds = new Set(state.greenhouses.map((g) => g.id));
          const newItems = greenhousesData.filter((g) => !existingIds.has(g.id));
          state.greenhouses = [...state.greenhouses, ...newItems];
        } else {
          state.greenhouses = greenhousesData;
        }

        // Update timestamp
        state.fetchTimestamp = now;
        state.initialized = true;
      }

      return sortedGreenhouses.value;
    } catch (err) {
      console.error("Error fetching greenhouses: ", err);
      state.error = "Unable to load greenhouses. Please try again later.";
      showToast("Unable to load greenhouses. Please try again later.", "error");
      return [];
    } finally {
      state.loading = false;
    }
  };

  // Optimized greenhouse detail fetching with caching
  const getGreenhouseWithPlants = async (greenhouseId) => {
    if (!greenhouseId) {
      throw new Error("Greenhouse ID is required");
    }

    state.loading = true;
    state.error = null;

    try {
      // Check authentication
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view greenhouse details");
      }

      const userId = auth.currentUser.uid;

      // Check cache first
      const cacheKey = `greenhouse-${greenhouseId}`;
      const cachedData = state.cache.get(cacheKey);
      const cacheExpiration = 30000; // 30 seconds

      if (cachedData && (Date.now() - cachedData.timestamp) < cacheExpiration) {
        state.loading = false;
        return cachedData.data;
      }

      // Not in cache, fetch from Firestore
      const greenhouseRef = doc(db, `userData/${userId}/greenhouses`, greenhouseId);
      const greenhouseSnap = await getDoc(greenhouseRef);

      if (!greenhouseSnap.exists()) {
        throw new Error("Greenhouse not found");
      }

      const greenhouseData = {
        id: greenhouseSnap.id,
        ...greenhouseSnap.data(),
      };

      // Ensure plants is an array
      if (!greenhouseData.plants || !Array.isArray(greenhouseData.plants)) {
        greenhouseData.plants = [];
      }

      // Efficiently fetch all plants in parallel
      const plantPromises = greenhouseData.plants.map(async (plantRef) => {
        try {
          let plantId;

          // Handle different reference types
          if (typeof plantRef === "string") {
            plantId = plantRef;
          } else if (plantRef.id) {
            plantId = plantRef.id;
          } else if (plantRef.path) {
            const pathParts = plantRef.path.split("/");
            plantId = pathParts[pathParts.length - 1];
          } else {
            return null; // Invalid reference
          }

          // Check plant cache
          const plantCacheKey = `plant-${plantId}`;
          const cachedPlant = state.cache.get(plantCacheKey);

          if (cachedPlant && (Date.now() - cachedPlant.timestamp) < cacheExpiration) {
            return cachedPlant.data;
          }

          // Not in cache, fetch from Firestore
          const plantDocRef = doc(db, `userData/${userId}/plants`, plantId);
          const plantSnap = await getDoc(plantDocRef);

          if (plantSnap.exists()) {
            const plantData = {
              id: plantSnap.id,
              ...plantSnap.data(),
            };

            // Cache the plant data
            state.cache.set(plantCacheKey, {
              data: plantData,
              timestamp: Date.now(),
            });

            return plantData;
          }

          return null;
        } catch (err) {
          console.error("Error fetching plant:", err);
          return null;
        }
      });

      // Wait for all plant fetches to complete and filter out nulls
      const plantsData = (await Promise.all(plantPromises)).filter(Boolean);

      // Create the result object with expanded plants
      const result = {
        ...greenhouseData,
        expandedPlants: plantsData,
      };

      // Cache the result
      state.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (err) {
      console.error("Error fetching greenhouse with plants: ", err);
      state.error = "Unable to load greenhouse details. Please try again later.";
      showToast("Unable to load greenhouse details. Please try again later.", "error");
      throw err;
    } finally {
      state.loading = false;
    }
  };

  // Add a new greenhouse with optimistic updates
  const addGreenhouse = async (greenhouseData) => {
    state.isAdding = true;
    state.error = null;

    try {
      // Validate data
      if (!greenhouseData.name) {
        throw new Error("Greenhouse name is required");
      }

      // Check authentication
      if (!auth.currentUser) {
        throw new Error("You must be logged in to add a greenhouse");
      }

      const userId = auth.currentUser.uid;

      // Prepare greenhouse data
      const newGreenhouseData = {
        ...greenhouseData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        plants: greenhouseData.plants || [],
      };

      // Create optimistic version for UI
      const optimisticId = `temp-${Date.now()}`;
      const optimisticGreenhouse = {
        id: optimisticId,
        ...newGreenhouseData,
        createdAt: new Date(),
        updatedAt: new Date(),
        pending: true,
        plantCount: 0,
      };

      // Add to local state immediately
      state.greenhouses.unshift(optimisticGreenhouse);

      // Add to Firestore
      const userGreenhousesRef = collection(db, `userData/${userId}/greenhouses`);
      const docRef = await addDoc(userGreenhousesRef, newGreenhouseData);

      // Replace optimistic entry with real one
      const realGreenhouse = {
        id: docRef.id,
        ...newGreenhouseData,
        createdAt: new Date(),
        updatedAt: new Date(),
        plantCount: 0,
      };

      // Update local state
      const index = state.greenhouses.findIndex((g) => g.id === optimisticId);
      if (index !== -1) {
        state.greenhouses.splice(index, 1, realGreenhouse);
      }

      showToast("Greenhouse added successfully", "success");
      return realGreenhouse;
    } catch (err) {
      console.error("Error adding greenhouse: ", err);

      // Remove optimistic entry on error
      state.greenhouses = state.greenhouses.filter((g) => !g.pending);

      state.error = "Unable to add greenhouse. Please try again later.";
      showToast("Unable to add greenhouse. Please try again later.", "error");
      throw err;
    } finally {
      state.isAdding = false;
    }
  };

  // Delete a greenhouse with optimistic UI update
  const deleteGreenhouse = async (greenhouseId) => {
    state.isDeleting = true;
    state.error = null;

    try {
      // Check authentication
      if (!auth.currentUser) {
        throw new Error("You must be logged in to delete a greenhouse");
      }

      const userId = auth.currentUser.uid;

      // Find the greenhouse in local state
      const index = state.greenhouses.findIndex((g) => g.id === greenhouseId);
      if (index === -1) {
        throw new Error("Greenhouse not found");
      }

      // Store for optimistic UI update
      const deletedGreenhouse = state.greenhouses[index];

      // Optimistically remove from UI
      state.greenhouses.splice(index, 1);

      // Update plants (remove greenhouseId references)
      const plantsRef = collection(db, `userData/${userId}/plants`);
      const batch = writeBatch(db);
      const plantsSnapshot = await getDocs(
        query(plantsRef, where("greenhouseId", "==", greenhouseId))
      );

      // More efficient - only update plants that reference this greenhouse
      plantsSnapshot.forEach((plantDoc) => {
        const plantRef = doc(db, `userData/${userId}/plants/${plantDoc.id}`);
        batch.update(plantRef, {
          greenhouseId: null,
          updatedAt: serverTimestamp(),
        });

        // Update plant cache if it exists
        const plantCacheKey = `plant-${plantDoc.id}`;
        const cachedPlant = state.cache.get(plantCacheKey);
        if (cachedPlant) {
          cachedPlant.data.greenhouseId = null;
          state.cache.set(plantCacheKey, {
            data: cachedPlant.data,
            timestamp: Date.now(),
          });
        }
      });

      // Commit batch operations
      await batch.commit();

      // Delete the greenhouse document
      const greenhouseDocRef = doc(db, `userData/${userId}/greenhouses`, greenhouseId);
      await deleteDoc(greenhouseDocRef);

      // Clear cache entries
      state.cache.delete(`greenhouse-${greenhouseId}`);

      showToast(`"${deletedGreenhouse.name}" deleted successfully`, "success");
      return true;
    } catch (err) {
      console.error("Error deleting greenhouse: ", err);

      // Revert optimistic update on error
      await fetchGreenhouses(false, state.searchQuery);

      state.error = "Unable to delete greenhouse. Please try again later.";
      showToast("Unable to delete greenhouse. Please try again later.", "error");
      throw err;
    } finally {
      state.isDeleting = false;
    }
  };

  // Efficient search implementation
  const searchGreenhouses = async (query) => {
    state.searchQuery = query;

    // For simple searches, just filter the existing data
    if (state.initialized && query.length < 3) {
      return sortedGreenhouses.value;
    }

    // Reset pagination
    state.lastDoc = null;
    state.noMoreResults = false;

    // Fetch with search parameter for more complex searches
    return await fetchGreenhouses(false, query);
  };

  // Reset state and clear cache
  const reset = () => {
    state.greenhouses = [];
    state.loading = false;
    state.error = null;
    state.isAdding = false;
    state.isDeleting = false;
    state.lastDoc = null;
    state.noMoreResults = false;
    state.initialized = false;
    state.cache.clear();
  };

  return {
    // Expose state
    greenhouses: computed(() => state.greenhouses),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    isAdding: computed(() => state.isAdding),
    isDeleting: computed(() => state.isDeleting),
    noMoreResults: computed(() => state.noMoreResults),
    sortBy: computed(() => state.sortBy),
    sortedGreenhouses,

    // Methods
    fetchGreenhouses,
    addGreenhouse,
    deleteGreenhouse,
    getGreenhouseWithPlants,
    searchGreenhouses,
    setSortBy,
    reset,

    // Include version in the return
    version: computed(() => version.value),
  };
}
