<script setup>
defineProps({
  openAddModal: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    class="dashboard-header bg-primary text-white rounded p-3 mb-4 shadow-sm"
  >
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="h2"><i class="bi bi-houses-fill me-2"></i>Greenhouses</h1>
      <div class="btn-toolbar">
        <div class="btn-group me-2">
          <button
            type="button"
            class="btn btn-success"
            v-tooltip
            title="Add Greenhouse"
            @click="openAddModal"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
