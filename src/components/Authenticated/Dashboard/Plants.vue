<script setup>
import { onMounted, ref } from "vue";
// Firebase imports
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useNotifications } from "/js/notifications";
import { getAuth } from "firebase/auth";
import { showToast } from "/js/toast";
import { Modal } from "bootstrap";

const db = getFirestore();
const auth = getAuth();
const plants = ref([]);
const { showNotification } = useNotifications();
const loading = ref(true);
const newPlant = ref({
  name: "",
  type: "",
  status: "healthy",
  wateringSchedule: 7,
  greenhouseId: null,
  notes: "",
});
const plantTypes = ref([
  "Succulent",
  "Flowering Plant",
  "Herb",
  "Vegetable",
  "Fruit Tree",
  "Fern",
  "Cactus",
  "Bonsai",
  "Vine",
  "Palm",
  "Houseplant",
  "Shrub",
]);

let addModal = null;
const plantToDelete = ref(null);
let deleteModal = null;

// Function to open the add plant modal
const openAddModal = () => {
  // Reset form fields
  newPlant.value = {
    name: "",
    type: "",
    status: "healthy",
    wateringSchedule: 7,
    greenhouseId: null,
    notes: "",
  };

  if (!addModal) {
    addModal = new Modal(document.getElementById("addPlantModal"));
  }
  addModal.show();
};

// Function to add a new plant to Firestore
const addPlant = async () => {
  // Validate form
  if (!newPlant.value.name) {
    showToast("Plant name is required", "error");
    return;
  }

  try {
    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to add a plant");
    }

    // Prepare plant data with timestamps and user ID
    const plantData = {
      ...newPlant.value,
      userId: auth.currentUser.uid,
      wateringDate: new Date(
        new Date().getTime() +
          newPlant.value.wateringSchedule * 24 * 60 * 60 * 1000
      ),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add document to Firestore
    const userPlantsRef = collection(
      db,
      `userData/${auth.currentUser.uid}/plants`
    );
    const docRef = await addDoc(userPlantsRef, plantData);

    // Add to local state with ID from Firestore
    const newPlantWithId = {
      id: docRef.id,
      ...plantData,
      // Replace the server timestamp with a JS date for immediate display
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    plants.value.push(newPlantWithId);

    // Show success message
    showToast("Plant added successfully", "success");

    // Close modal
    addModal.hide();
  } catch (error) {
    console.error("Error adding plant: ", error);
    showToast(`Error adding plant: ${error.message}`, "error");
  }
};

// Function to fetch plants from Firestore
const fetchPlants = async () => {
  loading.value = true;

  try {
    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to view plants");
    }

    const userPlantsRef = collection(
      db,
      `userData/${auth.currentUser.uid}/plants`
    );
    const querySnapshot = await getDocs(userPlantsRef);

    const plantsData = [];
    querySnapshot.forEach((doc) => {
      plantsData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Update plant state if watering date is in the past
    plantsData.forEach((plant) => {
      if (plant.wateringDate && plant.wateringDate.toDate() < new Date()) {
        plant.status = "needs water";
        // Update the plant status in Firestore
        const plantDocRef = doc(
          db,
          `userData/${auth.currentUser.uid}/plants`,
          plant.id
        );
        updateDoc(plantDocRef, {
          status: "needs water",
          wateringReminderFired: true,
        })
          .then(() => {
            // Show toast message if watering reminder is false
            if (!plant.wateringReminderFired) {
              showToast(`"${plant.name}" needs water!`, "warning", 5000);
              showNotification(); //TODO: FIX THIS ~~~~~~~~~~~~~~~
            }
          })
          .catch((error) => {
            console.error("Error updating plant status: ", error);
          });
      }
    });

    return plantsData;
  } catch (error) {
    console.error("Error fetching plants: ", error);
    showToast(`Error: ${error.message}`, "error");
    return [];
  } finally {
    loading.value = false;
  }
};

// Function to open the delete confirmation modal
const confirmDelete = (plant) => {
  plantToDelete.value = plant;

  if (!deleteModal) {
    deleteModal = new Modal(document.getElementById("deletePlantModal"));
  }
  deleteModal.show();
};

// Function to delete a plant from Firestore (after confirmation)
const deletePlant = async () => {
  try {
    if (!plantToDelete.value) return;

    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to delete a plant");
    }
    // Update greenhouse reference if the plant is associated with one
    if (plantToDelete.value.greenhouseId) {
      console.log(
        `Plant was associated with greenhouse ID: ${plantToDelete.value.greenhouseId}`
      );
      const greenhouseRef = doc(
        db,
        `userData/${auth.currentUser.uid}/greenhouses`,
        plantToDelete.value.greenhouseId
      );
      await updateDoc(greenhouseRef, {
        plants: arrayRemove(plantToDelete.value.id),
      });
    }
  } catch (error) {
    console.error("Error updating greenhouse reference: ", error);
    showToast(`Error: ${error.message}`, "error");
  }
  try {
    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to delete a plant");
    }
    // Check if plantToDelete is set
    if (!plantToDelete.value) {
      throw new Error("No plant selected for deletion");
    }
    // Delete from main plants collection
    const plantDocRef = doc(
      db,
      `userData/${auth.currentUser.uid}/plants`,
      plantToDelete.value.id
    );
    await deleteDoc(plantDocRef);

    // Remove from local state
    const index = plants.value.findIndex(
      (p) => p.id === plantToDelete.value.id
    );
    if (index !== -1) {
      plants.value.splice(index, 1);
      showToast(
        `"${plantToDelete.value.name}" deleted successfully`,
        "success"
      );
    }

    // Close modal and reset
    deleteModal.hide();
    plantToDelete.value = null;
  } catch (error) {
    console.error("Error deleting plant: ", error);
    showToast(`Error: ${error.message}`, "error");
  }
};

// Get status color for badges
const getStatusColor = (status) => {
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
};

onMounted(async () => {
  const fetchedPlants = await fetchPlants();
  plants.value = fetchedPlants;
});

defineOptions({
  name: "PlantsComponent",
});
</script>

<template>
  <div class="container">
    <div class="row">
      <!-- Header with Add Button -->
      <div
        class="flex-wrap col-md-12 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom w-100"
      >
        <h1 class="h2">
          <i class="bi bi-flower1 me-2 text-success"></i>My Plants
        </h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="tooltip"
            title="Add Plant"
            tooltip="Add Plant"
            @click="openAddModal"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="col-md-12 text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading your plants...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="plants.length === 0"
        class="col-md-12 text-center py-5 bg-body-secondary rounded-3"
      >
        <i class="bi bi-flower3 display-1 text-muted mb-3"></i>
        <p class="lead mb-4">
          You don't have any plants in your collection yet.
        </p>
        <button type="button" class="btn btn-success" @click="openAddModal">
          <i class="bi bi-plus-circle me-2"></i> Add Your First Plant
        </button>
      </div>

      <!-- Plants List -->
      <div v-else class="col-md-12">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          <div v-for="plant in plants" :key="plant.id" class="col">
            <div
              class="card h-100 shadow-sm border-0 hover-shadow bg-body-secondary"
            >
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h5 class="card-title mb-0">{{ plant.name }}</h5>
                <span
                  class="badge rounded-pill"
                  :class="getStatusColor(plant.status)"
                >
                  <i
                    class="bi"
                    :class="{
                      'bi-droplet': plant.status === 'needs water',
                      'bi-heart-fill': plant.status === 'healthy',
                      'bi-arrow-up-circle-fill': plant.status === 'growing',
                      'bi-exclamation-triangle-fill':
                        plant.status === 'diseased',
                    }"
                  ></i>
                  {{ plant.status || "No status" }}
                </span>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <i class="bi bi-tags me-2 text-muted"></i>
                  <span class="fw-light">{{
                    plant.type || "Unknown type"
                  }}</span>
                </div>
                <div class="mb-3">
                  <i class="bi bi-calendar3 me-2 text-muted"></i>
                  <span class="fw-light"
                    >Water every {{ plant.wateringSchedule }} days</span
                  >
                </div>
                <p class="card-text" v-if="plant.notes">
                  <i class="bi bi-journal-text me-2 text-muted"></i>
                  <small>{{ plant.notes }}</small>
                </p>
              </div>
              <div class="card-footer border-0">
                <div class="d-flex justify-content-between">
                  <router-link
                    :to="{
                      name: 'plant-detail',
                      params: { id: plant.id },
                    }"
                    class="btn btn-outline-primary"
                  >
                    <i class="bi bi-eye me-1"></i> Details
                  </router-link>
                  <button
                    class="btn btn-outline-danger"
                    @click="confirmDelete(plant)"
                  >
                    <i class="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <h5 class="modal-title" id="addPlantModalLabel">Add New Plant</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addPlant">
              <div class="mb-3">
                <label for="plantName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="plantName"
                  v-model="newPlant.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="plantType" class="form-label">Type</label>
                <select
                  class="form-select"
                  id="plantType"
                  v-model="newPlant.type"
                >
                  <option v-for="type in plantTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="plantStatus" class="form-label">Status</label>
                <select
                  class="form-select"
                  id="plantStatus"
                  v-model="newPlant.status"
                >
                  <option value="healthy">Healthy</option>
                  <option value="growing">Growing</option>
                  <option value="needs water">Needs Water</option>
                  <option value="diseased">Diseased</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="wateringSchedule" class="form-label"
                  >Watering Schedule (days)</label
                >
                <select
                  class="form-select"
                  id="wateringSchedule"
                  v-model="newPlant.wateringSchedule"
                >
                  <option value="1">Every day</option>
                  <option value="2">Every 2 days</option>
                  <option value="3">Every 3 days</option>
                  <option value="5">Every 5 days</option>
                  <option value="7">Every week</option>
                  <option value="14">Every 2 weeks</option>
                  <option value="30">Every month</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="plantNotes" class="form-label">Notes</label>
                <textarea
                  class="form-control"
                  id="plantNotes"
                  v-model="newPlant.notes"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary" @click="addPlant">
              Add Plant
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Plant Modal -->
    <div
      class="modal fade"
      id="deletePlantModal"
      tabindex="-1"
      aria-labelledby="deletePlantModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deletePlantModalLabel">
              Confirm Delete
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete
              <strong>{{ plantToDelete?.name }}</strong
              >?
            </p>
            <p class="text-danger">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="deletePlant">
              Delete Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
