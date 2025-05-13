<script setup>
// This component doesn't need any props or logic for now
defineOptions({
  name: "SettingsHeader",
});
</script>

<template>
  <div
    class="dashboard-header bg-primary text-white rounded p-3 mb-4 shadow-sm vertical-center"
  >
    <div class="d-flex justify-content-between align-items-center flex-wrap">
      <h1 class="h2 m-0"><i class="bi bi bi-gear-fill me-2"></i>Settings</h1>
    </div>
  </div>
</template>
