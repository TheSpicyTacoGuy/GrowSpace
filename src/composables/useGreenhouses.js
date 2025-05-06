import { ref, computed } from "vue";
import {
  getFirestore,
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
  startAfter
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "/js/toast";

export function useGreenhouses() {
  const db = getFirestore();
  const auth = getAuth();
  
  // State
  const greenhouses = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const isAdding = ref(false);
  const isDeleting = ref(false);
  const lastDoc = ref(null);
  const noMoreResults = ref(false);
  const itemsPerPage = 9;

  // Update computed property to handle plants as an array
  const greenhousesWithPlantCount = computed(() => {
    return greenhouses.value.map(greenhouse => ({
      ...greenhouse,
      plantCount: Array.isArray(greenhouse.plants) ? greenhouse.plants.length : 0
    }));
  });

  // Fetch greenhouses from Firestore
  const fetchGreenhouses = async (loadMore = false) => {
    if (loadMore && noMoreResults.value) return;
    
    if (!loadMore) {
      loading.value = true;
      error.value = null;
    }

    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view greenhouses");
      }

      const userGreenhousesRef = collection(
        db,
        `userData/${auth.currentUser.uid}/greenhouses`
      );
      
      // Create query with pagination
      let greenhouseQuery = query(
        userGreenhousesRef,
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );
      
      // If loading more, start after the last document
      if (loadMore && lastDoc.value) {
        greenhouseQuery = query(
          userGreenhousesRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc.value),
          limit(itemsPerPage)
        );
      }
      
      const querySnapshot = await getDocs(greenhouseQuery);
      
      // Update lastDoc for pagination
      const docs = querySnapshot.docs;
      lastDoc.value = docs.length > 0 ? docs[docs.length - 1] : null;
      noMoreResults.value = docs.length < itemsPerPage;

      const greenhousesData = [];
      querySnapshot.forEach((doc) => {
        // Make sure plants is always an array
        const docData = doc.data();
        
        // If plants is missing or not an array, initialize it
        if (!docData.plants || !Array.isArray(docData.plants)) {
          docData.plants = [];
        }
        
        greenhousesData.push({
          id: doc.id,
          formattedDate: new Date(docData.createdAt?.seconds * 1000).toLocaleDateString(),
          ...docData,
        });
      });

      // If loading more, append to existing list; otherwise replace
      if (loadMore) {
        greenhouses.value = [...greenhouses.value, ...greenhousesData];
      } else {
        greenhouses.value = greenhousesData;
      }
      
      return greenhousesData;
    } catch (err) {
      console.error("Error fetching greenhouses: ", err);
      error.value = "Unable to load greenhouses. Please try again later.";
      showToast("Unable to load greenhouses. Please try again later.", "error");
      return [];
    } finally {
      loading.value = false;
    }
  };

  // Add a new greenhouse with plants as an array
  const addGreenhouse = async (greenhouseData) => {
    isAdding.value = true;
    error.value = null;
    
    try {
      // Validate data
      if (!greenhouseData.name) {
        throw new Error("Greenhouse name is required");
      }

      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to add a greenhouse");
      }

      // Prepare greenhouse data with timestamps and user ID
      const newGreenhouseData = {
        ...greenhouseData,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        plants: greenhouseData.plants || [] // Initialize as an array, not an object
      };

      // Add document to Firestore
      const userGreenhousesRef = collection(
        db,
        `userData/${auth.currentUser.uid}/greenhouses`
      );
      const docRef = await addDoc(userGreenhousesRef, newGreenhouseData);

      // Create object with ID from Firestore
      const newGreenhouseWithId = {
        id: docRef.id,
        ...newGreenhouseData,
        // Replace server timestamps with JS dates for immediate display
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Add to local state
      greenhouses.value.unshift(newGreenhouseWithId);
      
      showToast("Greenhouse added successfully", "success");
      return newGreenhouseWithId;
    } catch (err) {
      console.error("Error adding greenhouse: ", err);
      error.value = "Unable to add greenhouse. Please try again later.";
      showToast("Unable to add greenhouse. Please try again later.", "error");
      throw err;
    } finally {
      isAdding.value = false;
    }
  };

  // Get a greenhouse with its plants expanded (fetch actual plant data)
  const getGreenhouseWithPlants = async (greenhouseId) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view greenhouse details");
      }
      
      const userId = auth.currentUser.uid;
      
      // Get the greenhouse document
      const greenhouseRef = doc(db, `userData/${userId}/greenhouses`, greenhouseId);
      const greenhouseSnap = await getDoc(greenhouseRef);
      
      if (!greenhouseSnap.exists()) {
        throw new Error("Greenhouse not found");
      }
      
      // Get the base greenhouse data
      const greenhouseData = {
        id: greenhouseSnap.id,
        ...greenhouseSnap.data()
      };
      
      // Ensure plants is an array
      if (!greenhouseData.plants || !Array.isArray(greenhouseData.plants)) {
        greenhouseData.plants = [];
      }
      
      // Get the actual plant data for each plant reference
      const plantsData = [];
      
      for (const plantRef of greenhouseData.plants) {
        try {
          let plantId;
          
          // Handle different types of references
          if (typeof plantRef === 'string') {
            // It's just an ID string
            plantId = plantRef;
          } else if (plantRef.id) {
            // It's a document reference with an id property
            plantId = plantRef.id;
          } else if (plantRef.path) {
            // It's an object with a path property
            const pathParts = plantRef.path.split('/');
            plantId = pathParts[pathParts.length - 1];
          } else {
            console.warn("Skipping invalid plant reference:", plantRef);
            continue;
          }
          
          // Create a document reference and fetch the plant
          const plantDocRef = doc(db, `userData/${userId}/plants`, plantId);
          const plantSnap = await getDoc(plantDocRef);
          
          if (plantSnap.exists()) {
            plantsData.push({
              id: plantSnap.id,
              ...plantSnap.data()
            });
          } else {
            console.warn(`Plant with ID ${plantId} not found in Firestore`);
          }
        } catch (err) {
          console.error("Error fetching plant:", err, plantRef);
          // Continue with the next plant
        }
      }
      
      // Return greenhouse with expanded plant data
      return {
        ...greenhouseData,
        expandedPlants: plantsData
      };
    } catch (err) {
      console.error("Error fetching greenhouse with plants: ", err);
      error.value = "Unable to load greenhouse details. Please try again later.";
      showToast("Unable to load greenhouse details. Please try again later.", "error");
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Delete a greenhouse
  const deleteGreenhouse = async (greenhouseId) => {
    isDeleting.value = true;
    error.value = null;
    
    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to delete a greenhouse");
      }

      const userId = auth.currentUser.uid;
      
      // Verify the greenhouse exists in our state
      const greenhouse = greenhouses.value.find(g => g.id === greenhouseId);
      if (!greenhouse) {
        throw new Error("Greenhouse not found");
      }

      // Remove greenhouseId from plants collection
      const plantsRef = collection(db, `userData/${userId}/plants`);
      const batch = writeBatch(db);
      const plantsSnapshot = await getDocs(plantsRef);

      // Update each plant to remove this greenhouseId
      plantsSnapshot.forEach((plantDoc) => {
        const plantData = plantDoc.data();
        if (plantData.greenhouseId === greenhouseId) {
          const plantRef = doc(db, `userData/${userId}/plants/${plantDoc.id}`);
          batch.update(plantRef, {
            greenhouseId: null,
            updatedAt: serverTimestamp(),
          });
        }
      });

      // Commit all batch operations
      await batch.commit();

      // Delete from Firestore
      const greenhouseDocRef = doc(
        db,
        `userData/${userId}/greenhouses`,
        greenhouseId
      );
      await deleteDoc(greenhouseDocRef);

      // Remove from local state
      const index = greenhouses.value.findIndex(g => g.id === greenhouseId);
      if (index !== -1) {
        const deletedGreenhouse = greenhouses.value[index];
        greenhouses.value.splice(index, 1);
        showToast(`"${deletedGreenhouse.name}" deleted successfully`, "success");
      }
      
      return true;
    } catch (err) {
      console.error("Error deleting greenhouse: ", err);
      error.value = "Unable to delete greenhouse. Please try again later.";
      showToast("Unable to delete greenhouse. Please try again later.", "error");
      throw err;
    } finally {
      isDeleting.value = false;
    }
  };

  // Reset state (useful when component unmounts)
  const reset = () => {
    greenhouses.value = [];
    loading.value = true;
    error.value = null;
    isAdding.value = false;
    isDeleting.value = false;
    lastDoc.value = null;
    noMoreResults.value = false;
  };

  return {
    // State
    greenhouses,
    greenhousesWithPlantCount,
    loading,
    error,
    isAdding,
    isDeleting,
    noMoreResults,
    
    // Methods
    fetchGreenhouses,
    addGreenhouse,
    deleteGreenhouse,
    getGreenhouseWithPlants, // Added new function
    reset
  };
}