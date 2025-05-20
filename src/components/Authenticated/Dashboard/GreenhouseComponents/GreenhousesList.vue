<script setup>
import GreenhouseCard from "./GreenhouseCard.vue";
import MobileCard from "../MobileCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
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
  onLoadMore: {
    type: Function,
    required: true,
  },
  openAddModal: {
    type: Function,
    required: true,
  },
});

// Function to navigate to greenhouse detail page
function navigateToGreenhouse(greenhouseId) {
  router.push(`/dashboard/greenhouses/${greenhouseId}`);
}
</script>

<template>
  <!-- Loading State -->
  <div
    v-if="loading && greenhouses.length === 0"
    class="col-md-12 text-center py-5"
  >
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 text-muted">Loading your greenhouses...</p>
  </div>

  <!-- Error State -->
  <div
    v-else-if="error && greenhouses.length === 0"
    class="col-md-12 text-center py-5 rounded-3 shadow-sm"
  >
    <div class="p-5">
      <i class="bi bi-exclamation-triangle display-1 text-danger mb-3"></i>
      <h3 class="mb-3">Error Loading Greenhouses</h3>
      <p class="lead mb-4 text-muted">{{ error }}</p>
      <button type="button" class="btn btn-primary" @click="onLoadMore(false)">
        <i class="bi bi-arrow-clockwise me-2"></i>Try Again
      </button>
    </div>
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

  <!-- DESKTOP VIEW: Greenhouse List -->
  <div v-else class="container-fluid d-none d-lg-block">
    <div class="row g-4 mb-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div v-for="greenhouse in greenhouses" :key="greenhouse.id" class="col">
        <GreenhouseCard :greenhouse="greenhouse" :onDelete="onDelete" />
      </div>
    </div>

    <!-- Loading more indicator -->
    <div v-if="loading && greenhouses.length > 0" class="text-center my-4">
      <div
        class="spinner-border text-success spinner-border-sm me-2"
        role="status"
      >
        <span class="visually-hidden">Loading more...</span>
      </div>
      <span class="text-muted">Loading more greenhouses...</span>
    </div>

    <!-- Load more button -->
    <div
      v-if="!loading && !noMoreResults && greenhouses.length > 0"
      class="text-center my-4"
    >
      <button class="btn btn-outline-primary" @click="onLoadMore(true)">
        <i class="bi bi-plus-lg me-2"></i>Load More
      </button>
    </div>
  </div>

  <!-- MOBILE VIEW: Mobile Card List -->
  <div class="d-block d-lg-none">
    <div v-for="greenhouse in greenhouses" :key="greenhouse.id" class="mb-3">
      <MobileCard
        :title="greenhouse.name"
        :subtitle="greenhouse.description"
        :badge="
          greenhouse.plants
            ? `${greenhouse.plants.length} plant(s)`
            : '0 plants'
        "
        :badgeClass="'bg-primary'"
        :badge2="greenhouse.location || 'No location set'"
        :badge2Class="'bg-body-secondary'"
        :icon="'bi-house-fill'"
        :iconClass="'bg-primary bg-opacity-10 text-primary'"
        @click="navigateToGreenhouse(greenhouse.id)"
      >
        <template #actions>
          <button
            class="btn btn-sm btn-link text-danger"
            @click.stop="onDelete(greenhouse)"
            v-tooltip="'Delete greenhouse'"
          >
            <i class="bi bi-trash"></i>
          </button>
        </template>
      </MobileCard>
    </div>

    <!-- Loading more indicator - Mobile -->
    <div v-if="loading && greenhouses.length > 0" class="text-center my-4">
      <div class="spinner-border spinner-border-sm text-primary" role="status">
        <span class="visually-hidden">Loading more...</span>
      </div>
      <span class="text-muted ms-2">Loading more...</span>
    </div>

    <!-- Load more button - Mobile -->
    <div
      v-if="!loading && !noMoreResults && greenhouses.length > 0"
      class="text-center my-4"
    >
      <button class="btn btn-outline-primary" @click="onLoadMore(true)">
        <i class="bi bi-plus-lg me-2"></i>Load More
      </button>
    </div>
  </div>
</template>
