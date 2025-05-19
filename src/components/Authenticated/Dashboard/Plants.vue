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
  <div class="dashboard-container p-3">
    <PlantHeader
      :openAddModal="openAddModal"
      :onSearch="handleSearch"
      :greenhouses="greenhouses"
      :onFilterByGreenhouse="handleFilterByGreenhouse"
      :selectedGreenhouseId="filters.greenhouseId"
    />

    <!-- Sort By Dropdown -->
    <div class="row mb-3">
      <div class="col-12 col-md-4 ms-auto">
        <label for="sortPlants" class="form-label visually-hidden"
          >Sort by</label
        >
        <select
          id="sortPlants"
          class="form-select"
          v-model="sortBy"
          @change="(e) => setSortBy(e.target.value)"
          aria-label="Sort plants"
        >
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="created">Newest First</option>
          <option value="created-asc">Oldest First</option>
        </select>
      </div>
    </div>

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
