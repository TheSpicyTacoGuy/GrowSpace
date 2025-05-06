<script setup>
defineProps({
  greenhouse: {
    type: Object,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="card h-100 shadow border-0 hover-shadow">
    <div
      class="card-header border-0 d-flex justify-content-between align-items-center bg-primary text-white"
    >
      <router-link
        :to="{
          name: 'greenhouse-detail',
          params: { id: greenhouse.id },
        }"
        class="text-white text-decoration-none"
      >
        <h5 class="card-title mb-0">{{ greenhouse.name }}</h5>
      </router-link>
    </div>
    <div class="card-body">
      <p class="card-text">{{ greenhouse.description }}</p>
      <p class="card-text">
        <i class="bi bi-rulers me-2 text-primary"></i>Size:
        {{ greenhouse.size }}m²
      </p>
      <p class="card-text">
        <i class="bi bi-geo-alt me-2 text-primary"></i>Location:
        {{ greenhouse.location }}
      </p>
      <p class="card-text">
        <i class="bi bi-calendar me-2 text-primary"></i>Created:
        {{ greenhouse.formattedDate }}
      </p>
      <p class="card-text">
        <i class="bi bi-flower1 me-2 text-primary"></i>Plants:
        {{ greenhouse.plants ? Object.keys(greenhouse.plants).length : 0 }}
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
          v-tooltip
          title="Delete Greenhouse"
          @click="onDelete(greenhouse)"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>
