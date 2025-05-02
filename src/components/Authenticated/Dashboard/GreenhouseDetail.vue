<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "/js/toast";
import { Modal } from "bootstrap";

const db = getFirestore();
const auth = getAuth();
const router = useRouter();
const greenhouse = ref(null);
const plants = ref([]);
const availablePlants = ref([]);
const selectedPlant = ref(null);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref("");
let plantModal = null;

const route = useRoute();
const greenhouseId = route.params.id;

const filteredAvailablePlants = computed(() => {
  if (!searchTerm.value) return availablePlants.value;

  const term = searchTerm.value.toLowerCase();
  return availablePlants.value.filter(
    (plant) =>
      plant.name.toLowerCase().includes(term) ||
      (plant.type && plant.type.toLowerCase().includes(term))
  );
});
// Function to fetch all available plants (not already in any greenhouse)
const fetchAvailablePlants = async () => {
  try {
    // Define reference to user plants collection
    const userPlantsRef = collection(
      db,
      `userData/${auth.currentUser.uid}/plants`
    );

    // Get all user plants from Firestore
    const plantsSnapshot = await getDocs(userPlantsRef);

    // Convert to array of plant objects, filtering those without greenhouseId
    const allPlants = [];
    plantsSnapshot.forEach((doc) => {
      const plantData = doc.data();
      console.log("Plant Data:", plantData); // Debugging line
      // Only include plants that don't have a greenhouseId (not in any greenhouse)
      if (!plantData.greenhouseId) {
        allPlants.push({
          id: doc.id,
          ...plantData,
        });
      }
    });

    // Additional safety check for plants already in this greenhouse
    const currentPlantIds = plants.value.map((p) => p.id);
    availablePlants.value = allPlants.filter(
      (p) => !currentPlantIds.includes(p.id)
    );
  } catch (err) {
    console.error("Error fetching available plants:", err);
    showToast(`Error loading plants: ${err.message}`, "error");
  }
};

// Function to add a plant to this greenhouse
const addPlantToGreenhouse = async () => {
  if (!selectedPlant.value) {
    showToast("Please select a plant to add", "warning");
    return;
  }

  try {
    // Update the greenhouse document with the plant reference
    const greenhouseRef = doc(
      db,
      `userData/${auth.currentUser.uid}/greenhouses`,
      greenhouseId
    );
    const plantRef = doc(
      db,
      `userData/${auth.currentUser.uid}/plants`,
      selectedPlant.value.id
    );

    // Add plant reference to greenhouse
    await updateDoc(greenhouseRef, {
      [`plants.${selectedPlant.value.id}`]: plantRef,
    });

    // Update the plant with the greenhouse reference
    await updateDoc(plantRef, {
      greenhouseId: greenhouseId,
    });

    // Update local state
    plants.value.push(selectedPlant.value);

    // Remove from available plants
    const index = availablePlants.value.findIndex(
      (p) => p.id === selectedPlant.value.id
    );
    if (index !== -1) {
      availablePlants.value.splice(index, 1);
    }

    showToast(
      `Added ${selectedPlant.value.name} to this greenhouse`,
      "success"
    );
    selectedPlant.value = null;
    plantModal.hide();
  } catch (err) {
    console.error("Error adding plant to greenhouse:", err);
    showToast(`Error: ${err.message}`, "error");
  }
};

const removePlantFromGreenhouse = async (plant) => {
  try {
    // Reference to the greenhouse and plant documents
    const greenhouseRef = doc(
      db,
      `userData/${auth.currentUser.uid}/greenhouses`,
      greenhouseId
    );
    const plantRef = doc(
      db,
      `userData/${auth.currentUser.uid}/plants`,
      plant.id
    );

    // Remove plant reference from greenhouse
    await updateDoc(greenhouseRef, {
      [`plants.${plant.id}`]: null, // Set to null to remove field
    });

    // Update the plant to remove greenhouse association
    await updateDoc(plantRef, {
      greenhouseId: null, // Clear the greenhouse ID
    });

    // Update local state
    const index = plants.value.findIndex((p) => p.id === plant.id);
    if (index !== -1) {
      plants.value.splice(index, 1);
    }

    showToast(`Removed ${plant.name} from this greenhouse`, "success");
  } catch (err) {
    console.error("Error removing plant from greenhouse:", err);
    showToast(`Error: ${err.message}`, "error");
  }
};

// Function to open the plant selection modal
const openPlantModal = async () => {
  // Fetch available plants
  await fetchAvailablePlants();

  // Initialize and show modal
  if (!plantModal) {
    plantModal = new Modal(document.getElementById("addPlantModal"));
  }
  plantModal.show();
};

// Function to fetch plants by references
async function fetchPlants(plantRefs) {
  try {
    const plantData = [];

    // Check if plantRefs is a map (object) rather than an array
    if (
      plantRefs &&
      typeof plantRefs === "object" &&
      !Array.isArray(plantRefs)
    ) {
      // Convert map of references to array
      for (const [key, plantRef] of Object.entries(plantRefs)) {
        if (plantRef && plantRef.path) {
          const plantDoc = await getDoc(doc(db, plantRef.path));
          if (plantDoc.exists()) {
            plantData.push({
              id: plantDoc.id,
              ...plantDoc.data(),
              refKey: key,
            });
          }
        }
      }
    }

    plants.value = plantData;
  } catch (err) {
    console.error("Error fetching plants:", err);
    showToast(`Error loading plants: ${err.message}`, "error");
  }
}

// Function to fetch the greenhouse by ID
const fetchGreenhouse = async () => {
  loading.value = true;
  error.value = null;

  try {
    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to view greenhouse details");
    }

    // Try to access the user-specific greenhouse collection
    const docRef = doc(
      db,
      `userData/${auth.currentUser.uid}/greenhouses`,
      greenhouseId
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const greenhouseData = { id: docSnap.id, ...docSnap.data() };
      greenhouse.value = greenhouseData;

      // Fetch plants if there are plant references
      if (greenhouseData.plants) {
        await fetchPlants(greenhouseData.plants);
      }
    } else {
      throw new Error("Greenhouse not found");
    }
  } catch (err) {
    error.value = err.message;
    showToast(`Error: ${err.message}`, "error");

    // Redirect back to greenhouses list after a delay
    setTimeout(() => {
      router.push("/dashboard/greenhouses");
    }, 3000);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchGreenhouse);
</script>

<template>
  <div>
    <div v-if="loading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading greenhouse details...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="greenhouse" class="greenhouse-details">
      <!-- Header with back button and add button -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center flex-wrap">
          <router-link
            :to="'/dashboard/greenhouses/'"
            class="btn btn-outline-primary me-3"
          >
            &larr; Back to Greenhouses
          </router-link>
          <h2 class="mb-0">{{ greenhouse.name }}</h2>
        </div>
      </div>

      <p>
        <strong>Description:</strong>
        {{ greenhouse.description || "No description" }}
      </p>
      <p><strong>Size:</strong> {{ greenhouse.size }} m²</p>
      <p><strong>Location:</strong> {{ greenhouse.location }}</p>

      <!-- Plants section -->
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="mt-4">Plants ({{ plants.length }})</h3>
        <button class="btn btn-success" @click="openPlantModal">
          <i class="bi bi-plus-circle me-1"></i> Add Plant
        </button>
      </div>
      <div v-if="plants.length === 0" class="alert alert-info">
        No plants added to this greenhouse yet.
      </div>
      <ul v-else class="list-group mb-4">
        <li
          v-for="plant in plants"
          :key="plant.id"
          class="list-group-item d-flex justify-content-between align-items-center w-100"
        >
          <div>
            {{ plant.name || "Unnamed Plant" }}
            <span class="badge bg-secondary ms-2">{{
              plant.type || "Unknown type"
            }}</span>
            <span class="badge mx-1" :class="getStatusColor(plant.status)">{{
              plant.status || "No status"
            }}</span>
          </div>
          <div>
            <button
              class="btn btn-sm btn-outline-danger me-2"
              @click="removePlantFromGreenhouse(plant)"
            >
              <i class="bi bi-trash me-1"></i> Remove Plant
            </button>
            <button
              class="btn btn-sm btn-outline-primary"
              @click="viewPlant(plant.id)"
            >
              View
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Add Plant Modal -->
    <div
      class="modal fade"
      id="addPlantModal"
      tabindex="-1"
      aria-labelledby="addPlantModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addPlantModalLabel">
              Add Plant to {{ greenhouse?.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="availablePlants.length === 0" class="alert alert-info">
              You don't have any plants available to add. Please create new
              plants first.
            </div>
            <div v-else>
              <p>Select a plant to add:</p>
              <div class="form-group mb-3">
                <input
                  type="text"
                  class="form-control mb-3"
                  placeholder="Search plants..."
                  v-model="searchTerm"
                />
                <div class="list-group">
                  <button
                    v-for="plant in filteredAvailablePlants"
                    :key="plant.id"
                    type="button"
                    class="list-group-item list-group-item-action"
                    :class="{ active: selectedPlant?.id === plant.id }"
                    @click="selectedPlant = plant"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {{ plant.name }}
                        <span class="badge bg-secondary ms-2">{{
                          plant.type
                        }}</span>
                      </div>
                      <span
                        class="badge"
                        :class="getStatusColor(plant.status)"
                        >{{ plant.status }}</span
                      >
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addPlantToGreenhouse"
              :disabled="!selectedPlant || availablePlants.length === 0"
            >
              Add Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Additional script section for non-setup methods
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    getStatusColor(status) {
      if (!status) return "bg-secondary";

      switch (status.toLowerCase()) {
        case "healthy":
          return "bg-success";
        case "growing":
          return "bg-info";
        case "needs water":
          return "bg-warning";
        case "diseased":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },
    viewPlant(plantId) {
      this.$router.push(`/dashboard/plants/${plantId}`);
    },
  },
};
</script>
