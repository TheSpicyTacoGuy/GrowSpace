<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { showToast } from "/js/toast";
import { Modal } from "bootstrap";
import { useGreenhouses } from "@composables/useGreenhouses";
import { usePlants } from "@composables/usePlants";

const router = useRouter();
const route = useRoute();
const greenhouseId = route.params.id;

// State variables
const greenhouse = ref(null);
const plants = ref([]);
const availablePlants = ref([]);
const selectedPlant = ref(null);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref("");
let plantModal = null;

// Get composable functions
const { getGreenhouseWithPlants } = useGreenhouses();
const {
  getPlantsWithoutGreenhouse,
  updatePlantDetails,
  updateGreenhousePlantRelationship,
} = usePlants();

// Computed property for filtered plants
const filteredAvailablePlants = computed(() => {
  if (!searchTerm.value) return availablePlants.value;

  const term = searchTerm.value.toLowerCase();
  return availablePlants.value.filter(
    (plant) =>
      plant.name.toLowerCase().includes(term) ||
      (plant.type && plant.type.toLowerCase().includes(term))
  );
});

// Function to get status color based on plant status
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

// Function to view plant details
const viewPlant = (plantId) => {
  router.push(`/dashboard/plants/${plantId}`);
};

// Function to fetch all available plants (not already in any greenhouse)
const fetchAvailablePlants = async () => {
  try {
    const plantsData = await getPlantsWithoutGreenhouse();
    const currentPlantIds = plants.value.map((p) => p.id);
    availablePlants.value = plantsData.filter(
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
    await updateGreenhousePlantRelationship(
      selectedPlant.value.id,
      greenhouseId
    );

    await updatePlantDetails(selectedPlant.value.id, {
      greenhouseId: greenhouseId,
    });

    plants.value.push(selectedPlant.value);

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

// Function to remove a plant from the greenhouse
const removePlantFromGreenhouse = async (plant) => {
  try {
    await updateGreenhousePlantRelationship(plant.id, null, greenhouseId);

    await updatePlantDetails(plant.id, {
      greenhouseId: null,
    });

    const index = plants.value.findIndex((p) => p.id === plant.id);
    if (index !== -1) {
      plants.value.splice(index, 1);

      availablePlants.value.push(plant);
    }

    showToast(`Removed ${plant.name} from this greenhouse`, "success");
  } catch (err) {
    console.error("Error removing plant from greenhouse:", err);
    showToast(`Error: ${err.message}`, "error");
  }
};

// Function to open the plant selection modal
const openPlantModal = async () => {
  await fetchAvailablePlants();

  if (!plantModal) {
    plantModal = new Modal(document.getElementById("addPlantModal"));
  }
  plantModal.show();
};

// Fetch the greenhouse data on mount
onMounted(async () => {
  try {
    loading.value = true;
    const data = await getGreenhouseWithPlants(greenhouseId);

    if (data) {
      greenhouse.value = data;
      plants.value = data.expandedPlants || [];
    } else {
      error.value = "Greenhouse not found";
      setTimeout(() => router.push("/dashboard/greenhouses"), 3000);
    }
  } catch (err) {
    console.error("Error loading greenhouse:", err);
    error.value = err.message;
    setTimeout(() => router.push("/dashboard/greenhouses"), 3000);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="greenhouse-detail-page">
    <!-- Loading state -->
    <div v-if="loading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading greenhouse details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ error }}
    </div>

    <!-- Greenhouse details -->
    <div v-else-if="greenhouse" class="greenhouse-details">
      <!-- Header section -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center">
              <router-link
                :to="{ name: 'greenhouses' }"
                class="btn btn-outline-primary me-3"
              >
                &larr; Back to Greenhouses
              </router-link>
              <h2 class="mb-0 text-primary">
                <i class="bi bi-houses-fill me-2"></i>
                {{ greenhouse.name }}
              </h2>
            </div>
          </div>

          <!-- Greenhouse details cards -->
          <div class="row mt-4">
            <div class="col-md-4 mb-3">
              <div class="card h-100 border-0 bg-body-secondary shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="bi bi-info-circle me-2 text-primary"></i
                    >Description
                  </h5>
                  <p class="card-text">
                    {{ greenhouse.description || "No description provided" }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card h-100 border-0 bg-body-secondary shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="bi bi-rulers me-2 text-primary"></i>Size
                  </h5>
                  <p class="card-text">
                    <span class="badge bg-primary rounded-pill fs-6"
                      >{{ greenhouse.size }} m²</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card h-100 border-0 bg-body-secondary shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="bi bi-geo-alt me-2 text-primary"></i>Location
                  </h5>
                  <p class="card-text">
                    <span class="badge bg-secondary rounded-pill fs-6">{{
                      greenhouse.location
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Plants section -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="mb-0">
              <i class="bi bi-flower1 me-2 text-success"></i>
              Plants
              <span class="badge bg-success rounded-pill">{{
                plants.length
              }}</span>
            </h3>

            <button
              class="btn btn-success"
              @click="openPlantModal"
              v-tooltip
              title="Add Plant"
            >
              <i class="bi bi-plus-circle"></i>
            </button>
          </div>

          <div v-if="plants.length === 0" class="alert alert-info">
            <i class="bi bi-info-circle me-2"></i>
            No plants added to this greenhouse yet.
          </div>

          <!-- Plants grid -->
          <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div v-for="plant in plants" :key="plant.id" class="col">
              <div class="card h-100 shadow-sm hover-card position-relative">
                <div class="position-absolute top-0 end-0 m-2">
                  <span class="badge" :class="getStatusColor(plant.status)">
                    <i class="bi bi-circle-fill me-1 small"></i>
                    {{ plant.status || "No status" }}
                  </span>
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    {{ plant.name || "Unnamed Plant" }}
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <i class="bi bi-tag me-1"></i>
                    {{ plant.type || "Unknown type" }}
                  </h6>

                  <div class="mt-3">
                    <div
                      v-if="plant.lastWatered"
                      class="d-flex align-items-center mb-2"
                    >
                      <i class="bi bi-droplet me-2 text-primary"></i>
                      <small
                        >Last watered:
                        {{
                          new Date(
                            plant.lastWatered.seconds * 1000
                          ).toLocaleDateString()
                        }}</small
                      >
                    </div>
                    <div
                      v-if="plant.lastFertilised"
                      class="d-flex align-items-center"
                    >
                      <i class="bi bi-water me-2 text-success"></i>
                      <small
                        >Last fertilised:
                        {{
                          new Date(
                            plant.lastFertilised.seconds * 1000
                          ).toLocaleDateString()
                        }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-transparent border-top-0">
                  <div class="d-flex justify-content-between">
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="removePlantFromGreenhouse(plant)"
                      title="Remove from greenhouse"
                    >
                      <i class="bi bi-trash me-1"></i> Remove
                    </button>
                    <button
                      class="btn btn-sm btn-primary"
                      @click="viewPlant(plant.id)"
                      title="View plant details"
                    >
                      <i class="bi bi-eye me-1"></i> View
                    </button>
                  </div>
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
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-body-secondary">
            <h5 class="modal-title" id="addPlantModalLabel">
              <i class="bi bi-plus-circle me-2 text-success"></i>
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
              <i class="bi bi-info-circle me-2"></i>
              You don't have any plants available to add. Please create new
              plants first.
            </div>
            <div v-else>
              <div class="input-group mb-4">
                <span class="input-group-text bg-body-secondary">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search plants..."
                  v-model="searchTerm"
                />
              </div>

              <div class="list-group">
                <button
                  v-for="plant in filteredAvailablePlants"
                  :key="plant.id"
                  type="button"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                  :class="{ active: selectedPlant?.id === plant.id }"
                  @click="selectedPlant = plant"
                >
                  <div class="d-flex align-items-center">
                    <i class="bi bi-flower2 me-3 fs-4"></i>
                    <div>
                      <h6 class="mb-0">{{ plant.name }}</h6>
                      <small>{{ plant.type || "Unknown type" }}</small>
                    </div>
                  </div>
                  <span class="badge" :class="getStatusColor(plant.status)">{{
                    plant.status
                  }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer bg-body-secondary">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              <i class="bi bi-x-circle me-1"></i> Cancel
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="addPlantToGreenhouse"
              :disabled="!selectedPlant || availablePlants.length === 0"
            >
              <i class="bi bi-plus-circle me-1"></i> Add Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  font-size: 0.8rem;
}

.hover-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.card-title {
  font-weight: 600;
}

.list-group-item.active {
  background-color: rgba(var(--bs-primary-rgb), 0.1);
  border-color: var(--bs-primary);
  color: var(--bs-dark);
}

.list-group-item.active i {
  color: var(--bs-primary);
}

.rounded-pill {
  padding: 0.5rem 1rem;
}
</style>
