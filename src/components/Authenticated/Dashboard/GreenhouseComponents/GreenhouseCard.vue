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
      <h5 class="card-title mb-0">{{ greenhouse.name }}</h5>
    </div>
    <div class="card-body">
      <p class="card-text">{{ greenhouse.description }}</p>
      <p class="card-text">Size: {{ greenhouse.size }} sq mtr</p>
      <p class="card-text">Location: {{ greenhouse.location }}</p>
      <p class="card-text">
        Plants: {{ Object.keys(greenhouse.plants || {}).length }}
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
