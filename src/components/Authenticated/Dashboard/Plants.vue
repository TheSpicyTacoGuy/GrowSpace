<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Modal } from "bootstrap";
import { usePlants } from "../../../composables/usePlants";
import { useGreenhouses } from "../../../composables/useGreenhouses";

// Components
import PlantHeader from "./PlantComponents/PlantHeader.vue";
import PlantsList from "./PlantComponents/PlantsList.vue";
import AddPlantModal from "./PlantComponents/AddPlantModal.vue";
import DeletePlantModal from "./PlantComponents/DeletePlantModal.vue";

// Composables
const {
  sortedPlants,
  loading,
  error,
  isAdding,
  isDeleting,
  noMoreResults,
  filters,
  fetchPlants,
  addPlant,
  deletePlant,
  reset: resetPlants,
  sortBy,
  setSortBy,
  handleSearch,
  handleFilterByGreenhouse,
  clearFilters,
  handleWaterPlant,
  handleFertilisePlant,
  handleUpdatePlant,
} = usePlants();

const {
  greenhouses,
  fetchGreenhouses,
  reset: resetGreenhouses,
} = useGreenhouses();

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
  await fetchGreenhouses();
  await fetchPlants();
});
onUnmounted(() => {
  if (addModal.value) addModal.value.dispose();
  if (deleteModal.value) deleteModal.value.dispose();
  resetPlants();
  resetGreenhouses();
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
