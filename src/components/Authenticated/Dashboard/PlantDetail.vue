<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { showToast } from "/js/toast";
import IconPencil from "../../icons/IconPencil.vue";
import { usePlants } from "../../../composables/usePlants";
import { useGreenhouses } from "../../../composables/useGreenhouses";

const router = useRouter();
const route = useRoute();
const plantId = route.params.id;

const plant = ref(null);
const loading = ref(true);
const error = ref(null);
const editing = ref(false);
const editedPlant = ref({});
const greenhouses = ref([]);

// Get plant-related functions from usePlants
const { getPlantById, recordCareEvent, updatePlantDetails } = usePlants();

// Get greenhouse-related functions from useGreenhouses
const { fetchGreenhouses } = useGreenhouses();

// Function to get status color based on plant status
function getStatusColor(status) {
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
}

// Format date helper function
function formatDate(timestamp) {
  if (!timestamp) return "N/A";

  // Handle both Firestore Timestamp and JS Date objects
  const date = timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Function to fetch the plant by ID using the composable
const fetchPlant = async () => {
  loading.value = true;
  error.value = null;

  try {
    plant.value = await getPlantById(plantId);
    editedPlant.value = { ...plant.value }; // Copy for editing
  } catch (err) {
    error.value = err.message;
    showToast(`Error: ${err.message}`, "error");

    // Redirect back to plants list after a delay
    setTimeout(() => {
      router.push("/dashboard/plants");
    }, 3000);
  } finally {
    loading.value = false;
  }
};

// Fetch greenhouses for dropdown using the dedicated composable
const fetchGreenhousesList = async () => {
  try {
    greenhouses.value = await fetchGreenhouses();
  } catch (err) {
    showToast(`Error fetching greenhouses: ${err.message}`, "error");
  }
};

// Start editing plant details
const startEditing = () => {
  editedPlant.value = { ...plant.value };
  editing.value = true;
};

// Add validation function
const validatePlant = (plant) => {
  const errors = [];

  if (!plant.name || plant.name.trim() === "") {
    errors.push("Name is required");
  }

  if (!plant.type || plant.type.trim() === "") {
    errors.push("Type is required");
  }

  if (!plant.status) {
    errors.push("Status is required");
  }

  if (!plant.wateringSchedule || plant.wateringSchedule.trim() === "") {
    errors.push("Watering schedule is required");
  }

  return errors;
};

// Save plant using the composable function
const savePlant = async () => {
  try {
    // Validate form fields
    const validationErrors = validatePlant(editedPlant.value);

    if (validationErrors.length > 0) {
      showToast(
        `Please fix the following: ${validationErrors.join(", ")}`,
        "error"
      );
      return;
    }

    loading.value = true;

    // Update with the composable
    await updatePlantDetails(plantId, {
      name: editedPlant.value.name.trim(),
      type: editedPlant.value.type.trim(),
      status: editedPlant.value.status,
      wateringSchedule: editedPlant.value.wateringSchedule.trim(),
      notes: editedPlant.value.notes || "",
      greenhouseId: editedPlant.value.greenhouseId || null, // Explicitly handle empty greenhouse
    });

    // Refresh the plant data
    await fetchPlant();

    editing.value = false;
  } catch (err) {
    showToast(`Error updating plant: ${err.message}`, "error");
  } finally {
    loading.value = false;
  }
};

// Record a plant care event using the composable
const handleCareEvent = async (eventType) => {
  try {
    const updatedPlant = await recordCareEvent(plantId, eventType);
    // Update local state with the returned data
    plant.value = updatedPlant;
    showToast(`${eventType} recorded successfully.`, "success");
  } catch (err) {
    showToast(`Error recording event: ${err.message}`, "error");
  }
};

onMounted(() => {
  fetchPlant();
  fetchGreenhousesList(); // Fetch greenhouses on mount
});
</script>

<template>
  <div class="container">
    <div v-if="loading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading plant details...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="plant" class="plant-details">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center flex-wrap">
          <router-link
            v-if="!editing"
            :to="{ name: 'plants' }"
            class="btn btn-outline-primary me-3"
          >
            &larr; Back to Plants
          </router-link>
          <h1 class="mb-0">{{ plant.name }}</h1>
          <span class="badge ms-3 fs-6" :class="getStatusColor(plant.status)">
            <i
              class="bi"
              :class="{
                'bi-droplet': plant.status === 'needs water',
                'bi-heart-fill': plant.status === 'healthy',
                'bi-arrow-up-circle-fill': plant.status === 'growing',
                'bi-exclamation-triangle-fill': plant.status === 'diseased',
              }"
            ></i>
            {{ plant.status || "No status" }}
          </span>
        </div>
        <button
          v-if="!editing"
          class="btn btn-outline-secondary"
          @click="startEditing"
          v-tooltip
          title="Edit Plant"
        >
          <IconPencil />
        </button>
      </div>

      <!-- Plant details in view mode -->
      <div v-if="!editing" class="row">
        <div class="col-md-6">
          <div class="card mb-4 shadow-sm">
            <div class="card-header bg-body-tertiary">
              <h5 class="card-title mb-0">
                <i class="bi bi-info-circle me-2"></i>Plant Details
              </h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-flower1 me-2 text-success"></i>Type</span
                  >
                  <span class="badge bg-secondary">{{
                    plant.type || "Not specified"
                  }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-check-circle me-2 text-primary"></i
                    >Status</span
                  >
                  <span class="badge" :class="getStatusColor(plant.status)">
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
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-calendar-event me-2 text-info"></i>Watering
                    Schedule</span
                  >
                  <span>{{ plant.wateringSchedule || "Not specified" }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-droplet me-2 text-primary"></i>Next
                    Watering</span
                  >
                  <span>{{
                    formatDate(plant.wateringDate) || "Not specified"
                  }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-calendar-plus me-2 text-secondary"></i
                    >Added on</span
                  >
                  <span>{{ formatDate(plant.createdAt) }}</span>
                </li>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-calendar-check me-2 text-secondary"></i
                    >Last Updated</span
                  >
                  <span>{{ formatDate(plant.updatedAt) }}</span>
                </li>
                <li
                  v-if="plant.greenhouseId"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    ><i class="bi bi-house-door me-2 text-success"></i
                    >Greenhouse</span
                  >
                  <router-link
                    :to="`/dashboard/greenhouses/${plant.greenhouseId}`"
                    class="btn btn-sm btn-outline-primary"
                  >
                    <i class="bi bi-arrow-right me-1"></i>View
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="card mb-4 shadow-sm">
            <div class="card-header bg-body-tertiary">
              <h5 class="card-title mb-0">
                <i class="bi bi-journal-text me-2"></i>Notes
              </h5>
            </div>
            <div class="card-body">
              <div class="p-3 bg-body rounded">
                <p v-if="plant.notes" class="mb-0">{{ plant.notes }}</p>
                <p v-else class="text-muted mb-0 fst-italic">
                  No notes added yet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Care Actions</h5>
              <div class="d-flex gap-2 flex-wrap">
                <button
                  class="btn btn-outline-primary"
                  @click="handleCareEvent('Watered')"
                >
                  <i class="bi bi-droplet"></i> Water
                </button>
                <button
                  class="btn btn-outline-success"
                  @click="handleCareEvent('Fertilised')"
                >
                  <i class="bi bi-tree"></i> Fertilise
                </button>
                <button
                  class="btn btn-outline-info"
                  @click="handleCareEvent('Pruned')"
                >
                  <i class="bi bi-scissors"></i> Prune
                </button>
                <button
                  class="btn btn-outline-warning"
                  @click="handleCareEvent('Repotted')"
                >
                  <i class="bi bi-bucket"></i> Repot
                </button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Care History</h5>
              <div v-if="!plant.careEvents || plant.careEvents.length === 0">
                <p class="text-muted">No care events recorded yet.</p>
              </div>
              <ul v-else class="list-group list-group-flush">
                <li
                  v-for="(event, index) in plant.careEvents"
                  :key="index"
                  class="list-group-item"
                >
                  <div class="d-flex justify-content-between">
                    <span>{{ event.type }}</span>
                    <span class="text-muted">{{
                      formatDate(event.timestamp)
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Plant edit form -->
      <div v-else class="row">
        <div class="col-md-8 mx-auto">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Edit Plant Details</h5>
              <form @submit.prevent="savePlant">
                <div class="mb-3">
                  <label for="plantName" class="form-label"
                    >Name <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="plantName"
                    v-model.trim="editedPlant.name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="plantType" class="form-label"
                    >Type <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="plantType"
                    v-model.trim="editedPlant.type"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="plantStatus" class="form-label"
                    >Status <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-select"
                    id="plantStatus"
                    v-model="editedPlant.status"
                    required
                  >
                    <option value="">-- Select Status --</option>
                    <option value="healthy">Healthy</option>
                    <option value="growing">Growing</option>
                    <option value="needs water">Needs Water</option>
                    <option value="diseased">Diseased</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="wateringSchedule" class="form-label">
                    Watering Schedule <span class="text-danger">*</span>
                  </label>
                  <select
                    class="form-select"
                    id="wateringSchedule"
                    v-model="editedPlant.wateringSchedule"
                    required
                  >
                    <option value="Every day">Every day</option>
                    <option value="Every 2 days">Every 2 days</option>
                    <option value="Every 3 days">Every 3 days</option>
                    <option value="Every 5 days">Every 5 days</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Every 2 weeks">Every 2 weeks</option>
                    <option value="Every 3 weeks">Every 3 weeks</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="plantNotes" class="form-label">Notes</label>
                  <textarea
                    class="form-control"
                    id="plantNotes"
                    v-model.trim="editedPlant.notes"
                    rows="3"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="plantGreenhouse" class="form-label"
                    >Greenhouse</label
                  >
                  <select
                    class="form-select"
                    id="plantGreenhouse"
                    v-model="editedPlant.greenhouseId"
                  >
                    <option value="">None (Outdoors)</option>
                    <option
                      v-for="greenhouse in greenhouses"
                      :key="greenhouse.id"
                      :value="greenhouse.id"
                    >
                      {{ greenhouse.name }}
                    </option>
                  </select>
                </div>
                <div class="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="editing = false"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
