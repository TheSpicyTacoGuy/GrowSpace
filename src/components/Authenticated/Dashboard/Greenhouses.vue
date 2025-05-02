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
  writeBatch,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "/js/toast";
import { Modal } from "bootstrap";

const db = getFirestore();
const auth = getAuth();
const greenhouses = ref([]);
const loading = ref(true);
const newGreenhouse = ref({
  name: "",
  description: "",
  size: 0,
  location: "",
  plants: {},
});
let addModal = null;
const greenhouseToDelete = ref(null);
let deleteModal = null;

// Function to open the add greenhouse modal
const openAddModal = () => {
  // Reset form fields
  newGreenhouse.value = {
    name: "",
    description: "",
    size: 0,
    location: "",
    plants: {},
  };

  if (!addModal) {
    addModal = new Modal(document.getElementById("addGreenhouseModal"));
  }
  addModal.show();
};

// Function to add a new greenhouse to Firestore
const addGreenhouse = async () => {
  // Validate form
  if (!newGreenhouse.value.name) {
    showToast("Greenhouse name is required", "error");
    return;
  }

  try {
    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to add a greenhouse");
    }

    // Prepare greenhouse data with timestamps and user ID
    const greenhouseData = {
      ...newGreenhouse.value,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add document to Firestore
    const userGreenhousesRef = collection(
      db,
      `userData/${auth.currentUser.uid}/greenhouses`
    );
    const docRef = await addDoc(userGreenhousesRef, greenhouseData);

    // Add to local state with ID from Firestore
    const newGreenhouseWithId = {
      id: docRef.id,
      ...greenhouseData,
      // Replace the server timestamp with a JS date for immediate display
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    greenhouses.value.push(newGreenhouseWithId);

    // Show success message
    showToast("Greenhouse added successfully", "success");

    // Close modal
    addModal.hide();
  } catch (error) {
    console.error("Error adding greenhouse: ", error);
    showToast(`Error adding greenhouse: ${error.message}`, "error");
  }
};

// Function to fetch greenhouses from Firestore
const fetchGreenhouses = async () => {
  loading.value = true;

  try {
    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to view greenhouses");
    }

    const userGreenhousesRef = collection(
      db,
      `userData/${auth.currentUser.uid}/greenhouses`
    );
    const querySnapshot = await getDocs(userGreenhousesRef);

    const greenhousesData = [];
    querySnapshot.forEach((doc) => {
      greenhousesData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return greenhousesData;
  } catch (error) {
    console.error("Error fetching greenhouses: ", error);
    showToast(`Error: ${error.message}`, "error");
    return [];
  } finally {
    loading.value = false;
  }
};

// Function to open the delete confirmation modal
const confirmDelete = (greenhouse) => {
  greenhouseToDelete.value = greenhouse;

  if (!deleteModal) {
    deleteModal = new Modal(document.getElementById("deleteGreenhouseModal"));
  }
  deleteModal.show();
};

// Function to delete a greenhouse from Firestore (after confirmation)
const deleteGreenhouse = async () => {
  try {
    if (!greenhouseToDelete.value) return;

    // Make sure user is authenticated
    if (!auth.currentUser) {
      throw new Error("You must be logged in to delete a greenhouse");
    }

    // Remove greenhouseId from plants collection
    const userId = auth.currentUser.uid;
    const plantsRef = collection(db, `userData/${userId}/plants`);

    // Create a batch for efficient updates
    const batch = writeBatch(db);

    // Get all plants with this greenhouseId
    const plantsSnapshot = await getDocs(plantsRef);

    // Update each plant to remove this greenhouseId
    plantsSnapshot.forEach((plantDoc) => {
      const plantData = plantDoc.data();
      if (plantData.greenhouseId === greenhouseToDelete.value.id) {
        // Reference to the plant document
        const plantRef = doc(db, `userData/${userId}/plants/${plantDoc.id}`);
        // Update to remove greenhouseId and mark as unassigned
        batch.update(plantRef, {
          greenhouseId: null,
          updatedAt: serverTimestamp(),
        });
      }
    });

    // Commit all the batch operations
    await batch.commit();
    console.log("Removed greenhouse reference from all associated plants");

    // Delete from Firestore
    const greenhouseDocRef = doc(
      db,
      `userData/${auth.currentUser.uid}/greenhouses`,
      greenhouseToDelete.value.id
    );
    await deleteDoc(greenhouseDocRef);

    // Remove from local state
    const index = greenhouses.value.findIndex(
      (g) => g.id === greenhouseToDelete.value.id
    );
    if (index !== -1) {
      greenhouses.value.splice(index, 1);
      showToast(
        `"${greenhouseToDelete.value.name}" deleted successfully`,
        "success"
      );
    }

    // Close modal and reset
    deleteModal.hide();
    greenhouseToDelete.value = null;
  } catch (error) {
    console.error("Error deleting greenhouse: ", error);
    showToast(`Error: ${error.message}`, "error");
  }
};

onMounted(async () => {
  const fetchedGreenhouses = await fetchGreenhouses();
  greenhouses.value = fetchedGreenhouses;
});

defineOptions({
  name: "GreenhousesComponent",
});
</script>

<template>
  <div class="container">
    <div class="row">
      <!-- Header with Add Button -->
      <div
        class="flex-wrap col-md-12 d-flex justify-content-between align-items-center pt-3 pb-2 mb-4 border-bottom"
      >
        <h1 class="h2">
          <i class="bi bi-house-fill text-success me-2"></i>Greenhouses
        </h1>
        <button
          type="button"
          class="btn btn-success"
          data-bs-toggle="tooltip"
          title="Add Greenhouse"
          tooltip="Add Greenhouse"
          @click="openAddModal"
        >
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="col-md-12 text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading your greenhouses...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="greenhouses.length === 0"
        class="col-md-12 text-center py-5 bg-body-secondary rounded-3 shadow-sm"
      >
        <div class="p-5">
          <i class="bi bi-house-add display-1 text-muted mb-3"></i>
          <h3 class="mb-3">No Greenhouses Yet</h3>
          <p class="lead mb-4 text-muted">
            Create your first greenhouse to start tracking your plants
          </p>
          <button type="button" class="btn btn-success" @click="openAddModal">
            <i class="bi bi-plus-circle me-2"></i>Add Your First Greenhouse
          </button>
        </div>
      </div>

      <!-- Greenhouse List -->
      <div v-else class="col-md-12">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          <div
            v-for="greenhouse in greenhouses"
            :key="greenhouse.id"
            class="col"
          >
            <div
              class="card h-100 shadow-sm border-0 hover-shadow bg-body-secondary"
            >
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <h5 class="card-title mb-0">{{ greenhouse.name }}</h5>
              </div>
              <div class="card-body">
                <p class="card-text">{{ greenhouse.description }}</p>
                <p class="card-text">Size: {{ greenhouse.size }} sq mtr</p>
                <p class="card-text">Location: {{ greenhouse.location }}</p>
                <p class="card-text">
                  Plants: {{ Object.keys(greenhouse.plants || {}).length }}
                </p>
              </div>
              <div class="card-footer border-0">
                <div class="d-flex justify-content-between">
                  <router-link
                    :to="{
                      name: 'greenhouse-detail',
                      params: { id: greenhouse.id },
                    }"
                    class="btn btn-outline-primary"
                  >
                    <i class="bi bi-eye me-1"></i> Details
                  </router-link>
                  <button
                    class="btn btn-outline-danger"
                    @click="confirmDelete(greenhouse)"
                  >
                    <i class="bi bi-trash me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Greenhouse Modal -->
      <div
        class="modal fade"
        id="addGreenhouseModal"
        tabindex="-1"
        aria-labelledby="addGreenhouseModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addGreenhouseModalLabel">
                Add New Greenhouse
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addGreenhouse">
                <div class="mb-3">
                  <label for="greenhouseName" class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="greenhouseName"
                    v-model="newGreenhouse.name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="greenhouseDescription" class="form-label"
                    >Description</label
                  >
                  <textarea
                    class="form-control"
                    id="greenhouseDescription"
                    v-model="newGreenhouse.description"
                    rows="3"
                  ></textarea>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="greenhouseSize" class="form-label"
                      >Size (sq mtr)</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="greenhouseSize"
                      v-model.number="newGreenhouse.size"
                      min="0"
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="greenhouseLocation" class="form-label"
                      >Location</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="greenhouseLocation"
                      v-model="newGreenhouse.location"
                    />
                  </div>
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
              <button
                type="button"
                class="btn btn-primary"
                @click="addGreenhouse"
              >
                Add Greenhouse
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Greenhouse Modal -->
      <div
        class="modal fade"
        id="deleteGreenhouseModal"
        tabindex="-1"
        aria-labelledby="deleteGreenhouseModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteGreenhouseModalLabel">
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
                <strong>{{ greenhouseToDelete?.name }}</strong
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
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteGreenhouse"
              >
                Delete Greenhouse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
