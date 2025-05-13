<script setup>
import PlantCard from "./PlantCard.vue";

defineProps({
  plants: {
    type: Array,
    required: true,
  },
  greenhouses: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
  noMoreResults: {
    type: Boolean,
    default: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
  onWater: {
    type: Function,
    required: true,
  },
  onFertilise: {
    type: Function,
    required: true,
  },
  onUpdate: {
    type: Function,
    required: true,
  },
  onLoadMore: {
    type: Function,
    required: true,
  },
  openAddModal: {
    type: Function,
    required: true,
  },
  selectedGreenhouseId: {
    type: String,
    default: null,
  },
  searchTerm: {
    type: String,
    default: "",
  },
});

// Helper function to get greenhouse for a plant
const getGreenhouseForPlant = (plant, greenhouses) => {
  if (!plant.greenhouseId) return null;
  return greenhouses.find((g) => g.id === plant.greenhouseId) || null;
};
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading && plants.length === 0" class="col-md-12 text-center py-5">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 text-muted">Loading your plants...</p>
  </div>

  <!-- Error State -->
  <div
    v-else-if="error && plants.length === 0"
    class="col-md-12 text-center py-5 rounded-3 shadow-sm"
  >
    <div class="p-5">
      <i class="bi bi-exclamation-triangle display-1 text-danger mb-3"></i>
      <h3 class="mb-3">Error Loading Plants</h3>
      <p class="lead mb-4 text-muted">{{ error }}</p>
      <button type="button" class="btn btn-primary" @click="onLoadMore(false)">
        <i class="bi bi-arrow-clockwise me-2"></i>Try Again
      </button>
    </div>
  </div>

  <!-- Empty State -->
  <div
    v-else-if="plants.length === 0"
    class="col-md-12 text-center py-5 bg-body-secondary rounded-3 shadow-sm"
  >
    <div class="p-5">
      <i class="bi bi-flower1 display-1 text-muted mb-3"></i>
      <h3 class="mb-3">No Plants Found</h3>

      <!-- Different message if filtering -->
      <p v-if="selectedGreenhouseId || searchTerm" class="lead mb-4 text-muted">
        No plants match your current filters.
        <button @click="$emit('clearFilters')" class="btn btn-link p-0">
          Clear filters
        </button>
      </p>
      <p v-else class="lead mb-4 text-muted">
        Start adding plants to track their growth and care
      </p>

      <button type="button" class="btn btn-success" @click="openAddModal">
        <i class="bi bi-plus-circle me-2"></i>Add Your First Plant
      </button>
    </div>
  </div>

  <!-- Plants Grid -->
  <div v-else class="container-fluid">
    <div class="row g-4 mb-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div v-for="plant in plants" :key="plant.id" class="col">
        <PlantCard
          :plant="plant"
          :greenhouse="getGreenhouseForPlant(plant, greenhouses)"
          :onDelete="onDelete"
          :onWater="onWater"
          :onFertilise="onFertilise"
          :onUpdate="onUpdate"
        />
      </div>
    </div>

    <!-- Loading more indicator -->
    <div v-if="loading && plants.length > 0" class="text-center my-4">
      <div
        class="spinner-border text-success spinner-border-sm me-2"
        role="status"
      >
        <span class="visually-hidden">Loading more...</span>
      </div>
      <span class="text-muted">Loading more plants...</span>
    </div>

    <!-- Load more button -->
    <div
      v-if="!loading && !noMoreResults && plants.length > 0"
      class="text-center my-4"
    >
      <button class="btn btn-outline-primary" @click="onLoadMore(true)">
        <i class="bi bi-plus-lg me-2"></i>Load More
      </button>
    </div>
  </div>
</template>
