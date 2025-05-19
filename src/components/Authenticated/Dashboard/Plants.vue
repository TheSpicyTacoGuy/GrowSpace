<script setup>
import {
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  onUpdated,
  ref,
  watch,
} from "vue";
import { Modal, Tooltip } from "bootstrap";
import { usePlants } from "@composables/usePlants";
import { useGreenhouses } from "@composables/useGreenhouses";
import MobilePageHeader from "@components/MobilePageHeader.vue";

// Components
import PlantHeader from "./PlantComponents/PlantHeader.vue";
import PlantsList from "./PlantComponents/PlantsList.vue";
import AddPlantModal from "./PlantComponents/AddPlantModal.vue";
import DeletePlantModal from "./PlantComponents/DeletePlantModal.vue";

// Composables
const {
  loading,
  error,
  isAdding,
  isDeleting,
  noMoreResults,
  fetchPlants,
  addPlant,
  deletePlant,
  reset,
  handleSearch,
  handleFilterByGreenhouse,
  sortBy,
  setSortBy,
  sortedPlants,
  version,
  updateLocalPlant,
  filters,
  clearFilters,
  handleWaterPlant,
  handleFertilisePlant,
  handleUpdatePlant,
} = usePlants();

// Get greenhouses for the filter dropdown
const { greenhouses, fetchGreenhouses } = useGreenhouses();

// Modal controls
const addModal = ref(null);
const deleteModal = ref(null);
const plantToDelete = ref(null);

const openAddModal = () => {
  if (!addModal.value) {
    addModal.value = new Modal(document.getElementById("addPlantModal"));
  }
  addModal.value.show();
};
const closeAddModal = () => {
  if (addModal.value) addModal.value.hide();
};

const confirmDelete = (plant) => {
  plantToDelete.value = plant;
  if (!deleteModal.value) {
    deleteModal.value = new Modal(document.getElementById("deletePlantModal"));
  }
  deleteModal.value.show();
};
const handleDelete = async () => {
  if (!plantToDelete.value) return;
  try {
    await deletePlant(plantToDelete.value.id);
    if (deleteModal.value) deleteModal.value.hide();
    plantToDelete.value = null;
  } catch (err) {
    console.error("Error deleting plant: ", err);
    // Error handled in composable
  }
};

const handleLoadMore = async (loadMore = false) => {
  await fetchPlants(loadMore);
};

onMounted(async () => {
  await Promise.all([fetchPlants(), fetchGreenhouses()]);
});
onUnmounted(() => {
  if (addModal.value) addModal.value.dispose();
  if (deleteModal.value) deleteModal.value.dispose();

  // Dispose tooltips to prevent the "Cannot convert undefined or null to object" error
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach((el) => {
    const tooltip = Tooltip.getInstance(el);
    if (tooltip) tooltip.dispose();
  });

  // FIXED: Use reset instead of resetPlants
  reset();
});

// Watch for changes to force component updates
watch(
  () => version.value,
  () => {
    // This empty watcher ensures the component reacts to changes
    // It's not always necessary but helps in complex cases
  },
  { immediate: true }
);

// Add a function to handle plant updates
function handlePlantUpdated(updatedPlant) {
  // Use the new method instead of trying to modify computed property
  updateLocalPlant(updatedPlant);
}

// Add this helper function to safely manage tooltips
const managePlantsTooltips = () => {
  try {
    // First, dispose any existing tooltips to prevent duplicates
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      try {
        const tooltip = Tooltip.getInstance(el);
        if (tooltip) {
          tooltip.dispose();
        }
      } catch (err) {
        // Silent catch for individual tooltip errors
      }
    });

    // Clean up any tooltip elements that might be orphaned
    document.querySelectorAll(".tooltip").forEach((el) => el.remove());

    // Re-initialize tooltips with proper configuration
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((el) => {
      try {
        new Tooltip(el, {
          trigger: "hover focus", // Define explicit triggers
          container: "body", // Attach to body for cleaner removal
          boundary: "window", // Improve positioning
        });
      } catch (err) {
        // Silent catch for individual tooltip errors
      }
    });
  } catch (e) {
    console.log("Error managing tooltips", e);
  }
};

// Call on component updates to ensure tooltips are properly managed after DOM changes
onUpdated(() => {
  // Use setTimeout to ensure DOM has fully updated
  setTimeout(() => {
    managePlantsTooltips();
  }, 100);
});

// Initialize tooltips after initial mount
onMounted(() => {
  Promise.all([fetchPlants(), fetchGreenhouses()]).then(() => {
    // Initialize tooltips after data is loaded and rendered
    setTimeout(managePlantsTooltips, 100);
  });
});

// Clean up more thoroughly before unmounting
onBeforeUnmount(() => {
  try {
    // Dispose all tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      try {
        const tooltip = Tooltip.getInstance(el);
        if (tooltip) tooltip.dispose();
      } catch (err) {
        // Silent catch
      }
    });

    // Remove any remaining tooltip elements
    document.querySelectorAll(".tooltip").forEach((el) => el.remove());

    // Reset body classes and attributes that Bootstrap might have added
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  } catch (e) {
    console.log("Error cleaning up tooltips", e);
  }
});

defineOptions({ name: "PlantsComponent" });
</script>

<template>
  <div class="dashboard-container">
    <!-- Mobile App-like Header (same pattern as Greenhouses) -->
    <MobilePageHeader
      title="Plants"
      actionIcon="plus-circle"
      secondaryIcon="search"
      @action="openAddModal"
      @secondaryAction="toggleSearch"
      class="d-block d-lg-none"
    />

    <!-- Mobile Search bar - shown when search is active -->
    <div
      v-if="showSearch"
      class="p-3 bg-body-secondary d-block d-lg-none rounded-3"
    >
      <div class="input-group">
        <span class="input-group-text bg-body border-end-0">
          <i class="bi bi-search"></i>
        </span>
        <input
          v-model="searchTerm"
          type="search"
          class="form-control border-start-0"
          placeholder="Search plants..."
          aria-label="Search"
          @input="handleSearch($event.target.value)"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="clearFilters"
          v-if="searchTerm"
          aria-label="Clear search"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Sort Options -->
    <div class="p-3 border-bottom d-block d-lg-none">
      <div class="d-flex align-items-center">
        <span class="text-muted me-2 small">Sort:</span>
        <select
          class="form-select form-select-sm border-0 bg-transparent p-0"
          v-model="sortBy"
          @change="(e) => setSortBy(e.target.value)"
          aria-label="Sort plants"
        >
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="created">Newest First</option>
          <option value="created-asc">Oldest First</option>
          <option value="needs-water">Needs Water</option>
        </select>
      </div>
      <div v-if="filters.greenhouseId" class="d-flex align-items-center mt-2">
        <div class="badge bg-primary rounded-pill d-flex align-items-center">
          <span class="me-1">Greenhouse Filter</span>
          <button
            class="btn-close btn-close-white ms-1 p-1"
            type="button"
            @click="clearFilters"
            style="font-size: 0.6em"
          ></button>
        </div>
      </div>
    </div>

    <!-- Desktop Header (unchanged) -->
    <PlantHeader
      :openAddModal="openAddModal"
      :onSearch="handleSearch"
      :greenhouses="greenhouses"
      :onFilterByGreenhouse="handleFilterByGreenhouse"
      :selectedGreenhouseId="filters.greenhouseId"
      class="d-none d-lg-block"
    />

    <!-- MOBILE VIEW: Mobile Plants List -->
    <div class="d-block d-lg-none">
      <!-- Loading state -->
      <div v-if="loading && !sortedPlants.length" class="text-center py-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!sortedPlants.length" class="text-center py-5">
        <div
          class="d-flex align-items-center justify-content-center mx-auto rounded-circle bg-body-secondary empty-state"
          style="width: 100px; height: 100px"
        >
          <i class="bi bi-flower1 text-muted display-1"></i>
        </div>
        <h2 class="h5 mb-3 mt-4">No Plants Yet</h2>
        <p class="text-muted mb-4">Add your first plant to get started</p>
        <button class="btn btn-primary rounded-pill px-4" @click="openAddModal">
          <i class="bi bi-plus-circle me-2"></i>Add Plant
        </button>
      </div>

      <!-- Plant Mobile List -->
      <div v-else class="p-3 pb-5 mb-5">
        <router-link
          v-for="plant in sortedPlants"
          :key="plant.id"
          :to="`/dashboard/plants/${plant.id}`"
          class="text-decoration-none"
        >
          <div
            class="d-flex align-items-center p-3 rounded-3 shadow-sm mb-3 bg-body-secondary mobile-list-item"
          >
            <div class="flex-shrink-0 me-3">
              <div class="bg-success bg-opacity-10 rounded-circle p-3">
                <i class="bi bi-flower1 text-success fs-4"></i>
              </div>
            </div>
            <div class="flex-grow-1">
              <h3 class="h6 mb-1">{{ plant.name }}</h3>
              <div class="small text-muted d-flex align-items-center">
                <i class="bi bi-tag me-1"></i>
                {{ plant.type || "Not specified" }}
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button
                class="btn btn-link text-danger p-2 me-2"
                @click.prevent.stop="confirmDelete(plant)"
                aria-label="Delete plant"
              >
                <i class="bi bi-trash"></i>
              </button>
              <i class="bi bi-chevron-right text-muted"></i>
            </div>
          </div>
        </router-link>

        <!-- Load more button -->
        <div v-if="!noMoreResults && !loading" class="d-grid mt-4">
          <button class="btn btn-outline-primary" @click="handleLoadMore(true)">
            Load More
          </button>
        </div>

        <!-- Loading more indicator -->
        <div v-if="loading" class="text-center py-3">
          <div
            class="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- DESKTOP VERSION: PlantsList component (unchanged) -->
    <div class="d-none d-lg-block">
      <PlantsList
        :plants="sortedPlants"
        :greenhouses="greenhouses"
        :loading="loading"
        :error="error"
        :noMoreResults="noMoreResults"
        :onDelete="confirmDelete"
        :onWater="handleWaterPlant"
        :onFertilise="handleFertilisePlant"
        :onUpdate="handleUpdatePlant"
        :onLoadMore="handleLoadMore"
        :openAddModal="openAddModal"
        :selectedGreenhouseId="filters.greenhouseId"
        :searchTerm="filters.searchTerm"
        @clearFilters="clearFilters"
        @plant-updated="handlePlantUpdated"
      />
    </div>

    <!-- Modals - shared between mobile and desktop -->
    <AddPlantModal
      :isAdding="isAdding"
      :addPlant="addPlant"
      :greenhouses="greenhouses"
      @modalClosed="closeAddModal"
    />

    <DeletePlantModal
      :plant="plantToDelete"
      :isDeleting="isDeleting"
      :confirmDelete="handleDelete"
    />
  </div>
</template>

<style scoped>
/* Mobile-specific styles */
.plants-mobile-list {
  margin-bottom: 70px; /* Space for bottom nav */
}

.mobile-list-item {
  transition: transform 0.15s;
}

.mobile-list-item:active {
  transform: scale(0.98);
}

/* Empty state styling */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
}
</style>
