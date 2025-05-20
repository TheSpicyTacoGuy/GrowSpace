<script setup>
import PlantCard from "./PlantCard.vue";
import MobileCard from "../MobileCard.vue";
import { usePlants } from "@composables/usePlants";
import router from "@js/router";

// Use the plants composable to get the helper functions
const { needsWater, needsFertiliser, getLastWateredFormatted } = usePlants();

const props = defineProps({
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

// Add the missing clearFilters emit
const emit = defineEmits(["plant-updated", "clearFilters"]);

// Helper function to get greenhouse for a plant
const getGreenhouseForPlant = (plant, greenhouses) => {
  if (!plant.greenhouseId) return null;
  return greenhouses.find((g) => g.id === plant.greenhouseId) || null;
};

// Handle plant updated from card
function handlePlantUpdated(updatedPlant) {
  // Emit to parent component
  emit("plant-updated", updatedPlant);
}

// Add navigation function for mobile cards
function navigateToPlant(plantId) {
  // Navigate to plant detail page
  router.push(`/dashboard/plants/${plantId}`);
}

// Function to handle delete button click
function confirmDelete(plant) {
  props.onDelete(plant);
}

// Update this function in PlantsList.vue
function waterPlant(plant) {
  if (!plant || !plant.id) {
    console.error("Invalid plant object:", plant);
    return;
  }
  // Store the ID in a variable to ensure it doesn't get lost
  const plantId = plant.id;
  // Call the handler with the ID
  props.onWater(plantId);
  // Immediately update the UI by modifying the plant locally
  // This creates the impression of instant feedback
  const now = new Date();
  // Use the stored ID for finding the plant
  const plantIndex = props.plants.findIndex((p) => p.id === plantId);
  if (plantIndex !== -1) {
    // Create a new object to ensure reactivity
    const updatedPlant = {
      ...props.plants[plantIndex],
      lastWatered: now,
    };
    // Emit the updated plant to parent
    emit("plant-updated", updatedPlant);
  }
}

function getStatusColour(plant) {
  if (plant.status === "diseased") return "bg-danger";
  if (plant.status === "healthy") return "bg-success";
  if (plant.status === "needs water") return "bg-warning";
  if (plant.status === "growing") return "bg-info";
  return "";
}
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
  <div v-else class="container-fluid d-none d-lg-block">
    <div class="row g-4 mb-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div v-for="plant in plants" :key="plant.id" class="col">
        <PlantCard
          :plant="plant"
          :greenhouse="getGreenhouseForPlant(plant, greenhouses)"
          :onDelete="onDelete"
          :onWater="onWater"
          :onFertilise="onFertilise"
          :onUpdate="onUpdate"
          @updated="handlePlantUpdated"
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

  <!-- Mobile View -->
  <div class="d-block d-lg-none">
    <div v-for="plant in plants" :key="plant.id" class="mb-3">
      <MobileCard
        :title="plant.name"
        :subtitle="plant.notes || 'Not specified'"
        :badge2="
          plant.status === 'diseased'
            ? 'Diseased'
            : plant.status === 'growing'
              ? 'Growing'
              : plant.status === 'needs water' || needsWater(plant)
                ? 'Needs Water'
                : plant.status === 'healthy' ||
                    (!needsWater(plant) && !needsFertiliser(plant))
                  ? 'Healthy'
                  : needsFertiliser(plant)
                    ? 'Needs Fertiliser'
                    : 'Healthy'
        "
        :badgeClass2="getStatusColour(plant)"
        :badgeClass="'bg-body-secondary'"
        :badge="plant.type"
        :icon="'bi-flower1'"
        :iconClass="getStatusColour(plant)"
        :badges="
          [
            needsWater(plant)
              ? {
                  text: `Last watered: ${getLastWateredFormatted(plant)}`,
                  icon: 'bi-droplet-fill',
                  class: 'bg-danger-subtle text-danger',
                }
              : null,
            needsFertiliser(plant)
              ? {
                  text: 'Needs fertiliser',
                  icon: 'bi-flower2',
                  class: 'bg-warning',
                }
              : null,
          ].filter(Boolean)
        "
        @click="navigateToPlant(plant.id)"
      >
        <template #actions>
          <button
            v-if="needsWater(plant)"
            class="btn btn-sm btn-link text-primary"
            @click.stop="waterPlant(plant)"
            v-tooltip="'Water plant'"
          >
            <i class="bi bi-droplet-fill"></i>
          </button>
          <button
            class="btn btn-sm btn-link text-danger"
            @click.stop="confirmDelete(plant)"
            v-tooltip="'Delete plant'"
          >
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </MobileCard>
    </div>
  </div>
</template>
