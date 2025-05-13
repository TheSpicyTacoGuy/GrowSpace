import { ref, computed } from "vue";
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
  getDoc
} from "firebase/firestore";
import { db, auth } from "@js/auth/firebase.js";
import { showToast } from "/js/toast";

export function usePlants() {
  // State
  const plants = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const isAdding = ref(false);
  const isDeleting = ref(false);
  const lastDoc = ref(null);
  const noMoreResults = ref(false);
  const itemsPerPage = 12;
  const filters = ref({
    greenhouseId: null,
    searchTerm: '',
  });

  // Function to convert watering frequency to human-readable text
  const getWateringScheduleText = (waterFrequency) => {
    if (!waterFrequency) return "Not specified";
    
    switch (waterFrequency) {
      case 1: return "Every day";
      case 2: return "Every 2 days";
      case 3: return "Every 3 days";
      case 5: return "Every 5 days";
      case 7: return "Weekly";
      case 14: return "Every 2 weeks";
      case 21: return "Every 3 weeks";
      case 30: return "Monthly";
      default: return `Every ${waterFrequency} days`;
    }
  };

  // Computed properties
  const filteredPlants = computed(() => {
    let result = [...plants.value];
    
    // Filter by greenhouse if selected
    if (filters.value.greenhouseId) {
      result = result.filter(plant => 
        plant.greenhouseId === filters.value.greenhouseId
      );
    }
    
    // Filter by search term if provided
    if (filters.value.searchTerm) {
      const searchLower = filters.value.searchTerm.toLowerCase();
      result = result.filter(plant => 
        plant.name.toLowerCase().includes(searchLower) ||
        plant.type.toLowerCase().includes(searchLower) ||
        (plant.notes && plant.notes.toLowerCase().includes(searchLower))
      );
    }
    
    return result;
  });

  // Fetch plants from Firestore
  const fetchPlants = async (loadMore = false) => {
    if (loadMore && noMoreResults.value) return;
    
    if (!loadMore) {
      loading.value = true;
      error.value = null;
    }

    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view plants");
      }

      const userPlantsRef = collection(
        db,
        `userData/${auth.currentUser.uid}/plants`
      );
      
      // Create query with pagination
      let plantsQuery = query(
        userPlantsRef,
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );
      
      // If loading more, start after the last document
      if (loadMore && lastDoc.value) {
        plantsQuery = query(
          userPlantsRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc.value),
          limit(itemsPerPage)
        );
      }
      
      // Apply greenhouse filter if selected
      if (filters.value.greenhouseId) {
        plantsQuery = query(
          userPlantsRef,
          where('greenhouseId', '==', filters.value.greenhouseId),
          orderBy('createdAt', 'desc'),
          limit(itemsPerPage)
        );
        
        if (loadMore && lastDoc.value) {
          plantsQuery = query(
            userPlantsRef,
            where('greenhouseId', '==', filters.value.greenhouseId),
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc.value),
            limit(itemsPerPage)
          );
        }
      }
      
      const querySnapshot = await getDocs(plantsQuery);
      
      // Update lastDoc for pagination
      const docs = querySnapshot.docs;
      lastDoc.value = docs.length > 0 ? docs[docs.length - 1] : null;
      noMoreResults.value = docs.length < itemsPerPage;

      const plantsData = [];
      querySnapshot.forEach((doc) => {
        plantsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // If loading more, append to existing list; otherwise replace
      if (loadMore) {
        plants.value = [...plants.value, ...plantsData];
      } else {
        plants.value = plantsData;
      }
      
      return plantsData;
    } catch (err) {
      console.error("Error fetching plants: ", err);
      error.value = "Unable to load plants. Please try again later.";
      showToast("Unable to load plants. Please try again later.", "error");
      return [];
    } finally {
      loading.value = false;
    }
  };

  // Set filters and refetch
  const setFilters = async (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
    lastDoc.value = null;
    noMoreResults.value = false;
    return await fetchPlants(false);
  };

  // Add plant
  const addPlant = async (plantData) => {
    isAdding.value = true;
    error.value = null;
    
    try {
      // Validate data
      if (!plantData.name) {
        throw new Error("Plant name is required");
      }

      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to add a plant");
      }

      // Calculate watering date based on frequency
      let daysToAdd = plantData.waterFrequency || 7;
      const wateringDate = new Date();
      wateringDate.setDate(wateringDate.getDate() + daysToAdd);
      
      // Generate human-readable watering schedule text
      let wateringSchedule = "Weekly"; // Default
      switch (daysToAdd) {
        case 1: wateringSchedule = "Every day"; break;
        case 2: wateringSchedule = "Every 2 days"; break;
        case 3: wateringSchedule = "Every 3 days"; break;
        case 5: wateringSchedule = "Every 5 days"; break;
        case 7: wateringSchedule = "Weekly"; break;
        case 14: wateringSchedule = "Every 2 weeks"; break;
        case 21: wateringSchedule = "Every 3 weeks"; break;
        case 30: wateringSchedule = "Monthly"; break;
        default: wateringSchedule = `Every ${daysToAdd} days`;
      }

      // Prepare plant data with timestamps and user ID
      const newPlantData = {
        name: plantData.name,
        type: plantData.type || "",
        notes: plantData.notes || "",
        waterFrequency: plantData.waterFrequency || 7,
        fertiliseFrequency: plantData.fertiliseFrequency || 30,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastWatered: serverTimestamp(),
        lastFertilised: serverTimestamp(),
        wateringSchedule: wateringSchedule,
        wateringDate: wateringDate, 
        status: "healthy" // Default status is healthy
      };
      
      // Only add greenhouseId if it's defined and not empty
      if (plantData.greenhouseId && plantData.greenhouseId.trim() !== "") {
        newPlantData.greenhouseId = plantData.greenhouseId;
      } else {
        // Explicitly set to null rather than undefined
        newPlantData.greenhouseId = null;
      }

      // Add document to Firestore
      const userPlantsRef = collection(
        db,
        `userData/${auth.currentUser.uid}/plants`
      );
      const docRef = await addDoc(userPlantsRef, newPlantData);
      const newPlantId = docRef.id;

      // Update greenhouse relationship if a greenhouse was selected
      if (plantData.greenhouseId) {
        await updateGreenhousePlantRelationship(newPlantId, plantData.greenhouseId);
      }

      // Create object with ID from Firestore
      const now = new Date();
      const newPlantWithId = {
        id: newPlantId,
        ...newPlantData,
        // Replace server timestamps with JS date objects for immediate display
        createdAt: now,
        updatedAt: now,
        lastWatered: now,        // Use a JavaScript Date for immediate UI display
        lastFertilised: now      // Use a JavaScript Date for immediate UI display
      };
      
      // Add to local state
      plants.value.unshift(newPlantWithId);
      
      showToast("Plant added successfully", "success");
      return newPlantWithId;
    } catch (err) {
      console.error("Error adding plant: ", err);
      error.value = "Unable to add plant. Please try again later.";
      showToast("Unable to add plant. Please try again later.", "error");
      throw err;
    } finally {
      isAdding.value = false;
    }
  };

  // Update plant
  const updatePlant = async (plantId, updateData) => {
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to update a plant");
      }

      // Calculate the next watering date based on the schedule if provided
      if (updateData.wateringSchedule) {
        let daysToAdd = 7; // Default value

        if (updateData.wateringSchedule === "Every day") {
          daysToAdd = 1;
        } else if (updateData.wateringSchedule === "Weekly") {
          daysToAdd = 7;
        } else if (updateData.wateringSchedule === "Monthly") {
          daysToAdd = 30;
        } else {
          // Try to extract number from strings like "Every 2 days" or "Every 2 weeks"
          const daysMatch = updateData.wateringSchedule.match(/\d+/);
          if (daysMatch) {
            let extractedValue = parseInt(daysMatch[0], 10);
            
            // If it contains "weeks", multiply by 7
            if (updateData.wateringSchedule.includes("week")) {
              extractedValue *= 7;
            }
            
            daysToAdd = extractedValue;
          }
        }

        const wateringDate = new Date();
        wateringDate.setDate(wateringDate.getDate() + daysToAdd);
        updateData.wateringDate = wateringDate;
      }

      // Always add updated timestamp
      updateData.updatedAt = serverTimestamp();
      
      const plantRef = doc(db, `userData/${auth.currentUser.uid}/plants`, plantId);
      await updateDoc(plantRef, updateData);

      // Update in local state if this plant is loaded
      const index = plants.value.findIndex(p => p.id === plantId);
      if (index !== -1) {
        plants.value[index] = { ...plants.value[index], ...updateData };
      }
      
      return true;
    } catch (err) {
      console.error("Error updating plant: ", err);
      error.value = "Unable to update plant. Please try again later.";
      showToast("Unable to update plant. Please try again later.", "error");
      throw err;
    }
  };

  const updatePlantDetails = async (plantId, updateData) => {
    try {
      // Get the current plant to check for greenhouse changes
      const plantRef = doc(db, `userData/${auth.currentUser.uid}/plants`, plantId);
      const plantSnap = await getDoc(plantRef);
      
      if (!plantSnap.exists()) {
        throw new Error("Plant not found");
      }
      
      const currentPlantData = plantSnap.data();
      const oldGreenhouseId = currentPlantData.greenhouseId || null;
      const newGreenhouseId = updateData.greenhouseId || null;
      
      // Create a clean update object
      const cleanUpdateData = { ...updateData };
      
      // Handle greenhouseId specifically - if it's an empty string, set to null
      if (cleanUpdateData.greenhouseId === "") {
        cleanUpdateData.greenhouseId = null;
      }
      
      // Calculate the next watering date based on the schedule if provided
      if (cleanUpdateData.wateringSchedule) {
        let daysToAdd = 7; // Default value

        if (cleanUpdateData.wateringSchedule === "Every day") {
          daysToAdd = 1;
        } else if (cleanUpdateData.wateringSchedule === "Weekly") {
          daysToAdd = 7;
        } else if (cleanUpdateData.wateringSchedule === "Monthly") {
          daysToAdd = 30;
        } else {
          // Try to extract number from strings like "Every 2 days" or "Every 2 weeks"
          const daysMatch = cleanUpdateData.wateringSchedule.match(/\d+/);
          if (daysMatch) {
            let extractedValue = parseInt(daysMatch[0], 10);
            
            // If it contains "weeks", multiply by 7
            if (cleanUpdateData.wateringSchedule.includes("week")) {
              extractedValue *= 7;
            }
            
            daysToAdd = extractedValue;
          }
        }

        const wateringDate = new Date();
        wateringDate.setDate(wateringDate.getDate() + daysToAdd);
        cleanUpdateData.wateringDate = wateringDate;
      }

      // Always add updated timestamp
      cleanUpdateData.updatedAt = serverTimestamp();
      
      // Update the plant document in Firestore
      await updateDoc(plantRef, cleanUpdateData);
      
      // If greenhouse association has changed, update greenhouse-plant relationships
      if (oldGreenhouseId !== newGreenhouseId) {
        await updateGreenhousePlantRelationship(plantId, newGreenhouseId, oldGreenhouseId);
      }

      // Update in local state if this plant is loaded
      const index = plants.value.findIndex(p => p.id === plantId);
      if (index !== -1) {
        plants.value[index] = { ...plants.value[index], ...cleanUpdateData };
      }
      
      return true;
    } catch (err) {
      console.error("Error updating plant: ", err);
      error.value = "Unable to update plant. Please try again later.";
      showToast("Unable to update plant. Please try again later.", "error");
      throw err;
    }
  };

  // Delete a plant
  const deletePlant = async (plantId) => {
    isDeleting.value = true;
    error.value = null;
    
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to delete a plant");
      }

      const userId = auth.currentUser.uid;
      
      // Verify the plant exists and get its data for greenhouse association
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      const plantSnap = await getDoc(plantRef);
      
      if (!plantSnap.exists()) {
        throw new Error("Plant not found");
      }
      
      const plantData = plantSnap.data();
      const greenhouseId = plantData.greenhouseId;
      
      // If the plant is associated with a greenhouse, remove it from the greenhouse
      if (greenhouseId) {
        await updateGreenhousePlantRelationship(plantId, null, greenhouseId);
      }

      // Delete from Firestore
      await deleteDoc(plantRef);

      // Remove from local state
      const index = plants.value.findIndex(p => p.id === plantId);
      if (index !== -1) {
        const deletedPlant = plants.value[index];
        plants.value.splice(index, 1);
        showToast(`"${deletedPlant.name}" deleted successfully`, "success");
      }
      
      return true;
    } catch (err) {
      console.error("Error deleting plant: ", err);
      error.value = "Unable to delete plant. Please try again later.";
      showToast("Unable to delete plant. Please try again later.", "error");
      throw err;
    } finally {
      isDeleting.value = false;
    }
  };

  // Get a single plant by ID
  const getPlantById = async (plantId) => {
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view plant details");
      }

      // Try to access the user-specific plant collection
      const docRef = doc(db, `userData/${auth.currentUser.uid}/plants`, plantId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const plantData = { id: docSnap.id, ...docSnap.data() };
        
        // Update status if watering date is past
        if (plantData.wateringDate) {
          const wateringDate = plantData.wateringDate.seconds 
            ? new Date(plantData.wateringDate.seconds * 1000)
            : new Date(plantData.wateringDate);
            
          // Check if the current date is past the watering date
          const currentDate = new Date();
          if (currentDate > wateringDate && plantData.status !== "needs water") {
            plantData.status = "needs water";
            
            // Update the status in Firestore
            await updateDoc(docRef, {
              status: "needs water",
              updatedAt: new Date(),
            });
          }
        }
        
        return plantData;
      } else {
        throw new Error("Plant not found");
      }
    } catch (err) {
      console.error("Error fetching plant: ", err);
      throw err;
    }
  };

  // Record a plant care event
  const recordCareEvent = async (plantId, eventType) => {
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to record care events");
      }

      const now = new Date(); // Current date for immediate UI use
      const event = { type: eventType, timestamp: now };

      // Status mapping for event types
      const statusMap = {
        Watered: "healthy",
        Fertilised: "growing",
        Pruned: "healthy",
        Repotted: "growing",
      };

      // Get current plant data
      const plantRef = doc(db, `userData/${auth.currentUser.uid}/plants`, plantId);
      const plantSnap = await getDoc(plantRef);

      if (!plantSnap.exists()) {
        throw new Error("Plant not found");
      }

      const plantData = plantSnap.data();

      // Create the careEvents array if it doesn't exist
      const careEvents = plantData.careEvents || [];
      careEvents.unshift(event);

      // Create base update object with common fields
      const updateData = {
        careEvents,
        lastCareEvent: event,
        status: statusMap[eventType] || plantData.status,
        updatedAt: serverTimestamp(),
      };

      // Create a parallel object for immediate UI update (with JS Date objects)
      const uiUpdateData = {
        careEvents,
        lastCareEvent: event,
        status: statusMap[eventType] || plantData.status,
        updatedAt: now,
      };

      // Add watering-specific fields if this is a watering event
      if (eventType === "Watered") {
        // Extract days from watering schedule
        let daysToAdd = 7; // Default value

        if (plantData.wateringSchedule) {
          if (plantData.wateringSchedule === "Every day") {
            daysToAdd = 1;
          } else if (plantData.wateringSchedule === "Weekly") {
            daysToAdd = 7;
          } else if (plantData.wateringSchedule === "Monthly") {
            daysToAdd = 30;
          } else {
            // Try to extract number from strings like "Every 2 days" or "Every 2 weeks"
            const daysMatch = plantData.wateringSchedule.match(/\d+/);
            if (daysMatch) {
              let extractedValue = parseInt(daysMatch[0], 10);

              // If it contains "weeks", multiply by 7
              if (plantData.wateringSchedule.includes("week")) {
                extractedValue *= 7;
              }

              daysToAdd = extractedValue;
            }
          }
        }

        const wateringDate = new Date();
        wateringDate.setDate(wateringDate.getDate() + daysToAdd);

        // Set values for Firestore update
        updateData.status = "healthy"; // Reset status to healthy
        updateData.wateringDate = wateringDate;
        updateData.lastWatered = serverTimestamp();
        updateData.wateringReminderFired = false;

        // Set values for UI update
        uiUpdateData.status = "healthy";
        uiUpdateData.wateringDate = wateringDate;
        uiUpdateData.lastWatered = now;
        uiUpdateData.wateringReminderFired = false;
      }

      // If this is a fertilising event, update lastFertilised date
      if (eventType === "Fertilised") {
        updateData.lastFertilised = serverTimestamp();
        uiUpdateData.lastFertilised = now;
      }

      // Update Firestore with all the changes
      await updateDoc(plantRef, updateData);

      // Show toast with plant name
      showToast(
        `"${plantData.name}" ${eventType.toLowerCase()} successfully`,
        "success"
      );

      // Return updated plant data with the changes for immediate UI update
      // Use JS Date objects instead of serverTimestamp()
      return {
        id: plantId,
        ...plantData,
        ...uiUpdateData,
      };
    } catch (err) {
      console.error("Error recording care event: ", err);
      throw err;
    }
  };

  // Update the relationship between a plant and a greenhouse
  const updateGreenhousePlantRelationship = async (plantId, newGreenhouseId, oldGreenhouseId = null) => {
    try {
      const userId = auth.currentUser.uid;
      
      // Create a document reference for the plant
      const plantRef = doc(db, `userData/${userId}/plants`, plantId);
      
      // If the plant was previously in a greenhouse, remove it from that greenhouse
      if (oldGreenhouseId) {
        // Get the old greenhouse document
        const oldGreenhouseRef = doc(db, `userData/${userId}/greenhouses`, oldGreenhouseId);
        const oldGreenhouseSnap = await getDoc(oldGreenhouseRef);
        
        if (oldGreenhouseSnap.exists()) {
          const oldGreenhouseData = oldGreenhouseSnap.data();
          const plants = oldGreenhouseData.plants || [];
          
          // Remove this plant from the array by filtering out its path
          // Some may be references, some may be strings, so handle both cases
          const plantPath = `userData/${userId}/plants/${plantId}`;
          const updatedPlants = plants.filter(plant => {
            // If it's a reference with path property
            if (plant.path) {
              return plant.path !== plantPath;
            }
            // If it's just the ID as a string
            return plant !== plantId;
          });
          
          // Update the greenhouse document
          await updateDoc(oldGreenhouseRef, {
            plants: updatedPlants,
            updatedAt: serverTimestamp()
          });
        }
      }
      
      // If the plant is being added to a greenhouse, add it to that greenhouse
      if (newGreenhouseId) {
        // Get the new greenhouse document
        const newGreenhouseRef = doc(db, `userData/${userId}/greenhouses`, newGreenhouseId);
        const newGreenhouseSnap = await getDoc(newGreenhouseRef);
        
        if (newGreenhouseSnap.exists()) {
          const newGreenhouseData = newGreenhouseSnap.data();
          const plants = newGreenhouseData.plants || [];
          
          // Check if the plant reference is already in the array
          const plantPath = `userData/${userId}/plants/${plantId}`;
          const alreadyExists = plants.some(plant => {
            // If it's a reference with path property
            if (plant.path) {
              return plant.path === plantPath;
            }
            // If it's just the ID as a string
            return plant === plantId;
          });
          
          // Only add the plant if it's not already in the array
          if (!alreadyExists) {
            // Add the document reference to the array, not just the ID
            plants.push(plantRef);
            
            // Update the greenhouse document
            await updateDoc(newGreenhouseRef, {
              plants: plants,
              updatedAt: serverTimestamp()
            });
          }
        }
      }
    } catch (err) {
      console.error("Error updating greenhouse-plant relationship:", err);
      showToast("Error updating greenhouse relationship", "error");
      // We don't throw here to prevent blocking the main operation
    }
  };

  // Add this function to get plants without a greenhouse
  const getPlantsWithoutGreenhouse = async () => {
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view plants");
      }

      const userPlantsRef = collection(
        db,
        `userData/${auth.currentUser.uid}/plants`
      );
      
      // Create query to get plants without a greenhouse
      const plantsQuery = query(
        userPlantsRef,
        where("greenhouseId", "==", null)
      );
      
      const querySnapshot = await getDocs(plantsQuery);
      
      const plantsData = [];
      querySnapshot.forEach((doc) => {
        plantsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return plantsData;
    } catch (err) {
      console.error("Error fetching plants without greenhouse:", err);
      throw err;
    }
  };

  // Reset state (useful when component unmounts)
  const reset = () => {
    plants.value = [];
    loading.value = true;
    error.value = null;
    isAdding.value = false;
    isDeleting.value = false;
    lastDoc.value = null;
    noMoreResults.value = false;
    filters.value = {
      greenhouseId: null,
      searchTerm: '',
    };
  };

  return {
    // State
    plants,
    filteredPlants,
    loading,
    error,
    isAdding,
    isDeleting,
    noMoreResults,
    filters,
    
    // Methods
    fetchPlants,
    setFilters,
    addPlant,
    updatePlant,
    updatePlantDetails,
    deletePlant,
    getPlantById,
    recordCareEvent,
    reset,
    getWateringScheduleText,
    updateGreenhousePlantRelationship,
    getPlantsWithoutGreenhouse  // Add the new function
  };
}