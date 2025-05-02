<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Modal } from "bootstrap";
import { usePlants } from "../../../composables/usePlants";
import { useGreenhouses } from "../../../composables/useGreenhouses";
import { serverTimestamp } from "firebase/firestore";

// Import components
import PlantHeader from "./PlantComponents/PlantHeader.vue";
import PlantsList from "./PlantComponents/PlantsList.vue";
import AddPlantModal from "./PlantComponents/AddPlantModal.vue";
import DeletePlantModal from "./PlantComponents/DeletePlantModal.vue";

// Use the plants composable
const {
  filteredPlants,
  loading,
  error,
  isAdding,
  isDeleting,
  noMoreResults,
  filters,
  fetchPlants,
  setFilters,
  addPlant,
  updatePlant,
  deletePlant,
  reset: resetPlants,
} = usePlants();

// Use the greenhouses composable to get greenhouse data for dropdown
const {
  greenhouses,
  fetchGreenhouses,
  reset: resetGreenhouses,
} = useGreenhouses();

// Modal controls
const addModal = ref(null);
const deleteModal = ref(null);
const plantToDelete = ref(null);

// Function to open the add plant modal
const openAddModal = () => {
  if (!addModal.value) {
    addModal.value = new Modal(document.getElementById("addPlantModal"));
  }
  addModal.value.show();
};

// Function to close the add plant modal
const closeAddModal = () => {
  if (addModal.value) {
    addModal.value.hide();
  }
};

// Function to open the delete confirmation modal
const confirmDelete = (plant) => {
  plantToDelete.value = plant;

  if (!deleteModal.value) {
    deleteModal.value = new Modal(document.getElementById("deletePlantModal"));
  }
  deleteModal.value.show();
};

// Function to handle delete confirmation
const handleDelete = async () => {
  if (!plantToDelete.value) return;

  try {
    await deletePlant(plantToDelete.value.id);
    if (deleteModal.value) {
      deleteModal.value.hide();
    }
    plantToDelete.value = null;
  } catch (err) {
    return err;
    // Error is handled in the composable
  }
};

// Function to handle watering a plant
const handleWaterPlant = async (plantId) => {
  try {
    const now = new Date();
    await updatePlant(plantId, {
      lastWatered: serverTimestamp(),
      // Include a JavaScript timestamp for immediate UI update
      _lastWateredJS: now,
    });
  } catch (err) {
    return err;
    // Error is handled in the composable
  }
};

// Function to handle fertilising a plant
const handleFertilisePlant = async (plantId) => {
  try {
    const now = new Date();
    await updatePlant(plantId, {
      lastFertilised: serverTimestamp(),
      // Include a JavaScript timestamp for immediate UI update
      _lastFertilisedJS: now,
    });
  } catch (err) {
    return err;
    // Error is handled in the composable
  }
};

// Function to handle plant updates
const handleUpdatePlant = async (plantId, updateData) => {
  try {
    await updatePlant(plantId, updateData);
  } catch (err) {
    return err;
    // Error is handled in the composable
  }
};

// Function to handle load more
const handleLoadMore = async (loadMore = false) => {
  await fetchPlants(loadMore);
};

// Function to handle search
const handleSearch = async (searchTerm) => {
  await setFilters({ searchTerm });
};

// Function to filter by greenhouse
const handleFilterByGreenhouse = async (greenhouseId) => {
  await setFilters({ greenhouseId });
};

// Function to clear all filters
const clearFilters = async () => {
  await setFilters({
    greenhouseId: null,
    searchTerm: "",
  });
};

// Initialize component
onMounted(async () => {
  // Fetch greenhouses first
  await fetchGreenhouses();
  // Then fetch plants
  await fetchPlants();
});

// Clean up when component unmounts
onUnmounted(() => {
  // Dispose modals
  if (addModal.value) {
    addModal.value.dispose();
  }
  if (deleteModal.value) {
    deleteModal.value.dispose();
  }

  // Reset state
  resetPlants();
  resetGreenhouses();
});

defineOptions({
  name: "PlantsComponent",
});
</script>

<template>
  <div class="dashboard-container p-3">
    <!-- Header with Add Button and Filters -->
    <PlantHeader
      :openAddModal="openAddModal"
      :onSearch="handleSearch"
      :greenhouses="greenhouses"
      :onFilterByGreenhouse="handleFilterByGreenhouse"
      :selectedGreenhouseId="filters.greenhouseId"
    />

    <!-- Plants List (includes loading, empty, and list states) -->
    <PlantsList
      :plants="filteredPlants"
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
    />

    <!-- Modals -->
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
