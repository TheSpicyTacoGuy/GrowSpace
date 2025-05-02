<script setup>
// This component doesn't need any props or logic for now
defineOptions({
  name: "DashboardHeader",
});
</script>

<template>
  <div
    class="dashboard-header bg-primary text-white rounded p-3 mb-4 shadow-sm"
  >
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="h2"><i class="bi bi-grid-1x2-fill me-2"></i>Dashboard</h1>
      <div class="btn-toolbar">
        <div class="btn-group me-2">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            v-tooltip
            title="Share Dashboard"
          >
            <i class="bi bi-share me-1"></i> Share
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            v-tooltip
            title="Export Data"
          >
            <i class="bi bi-download me-1"></i> Export
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
