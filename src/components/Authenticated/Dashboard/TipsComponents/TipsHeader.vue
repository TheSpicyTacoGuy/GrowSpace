<script setup>
// This component doesn't need any props or logic for now
defineOptions({
  name: "TipsHeader",
});
</script>

<template>
  <div
    class="dashboard-header bg-primary text-white rounded p-3 mb-4 shadow-sm vertical-center"
  >
    <div class="d-flex justify-content-between align-items-center flex-wrap">
      <h1 class="h2 m-0"><i class="bi bi-chat-left-text-fill me-2"></i>Tips</h1>
      <div class="d-flex align-items-center">
        <p class="m-0 me-2 sm-mt-2">
          <i class="bi bi-info-circle-fill me-1"></i>
          <strong>Share your knowledge!</strong>
          <br />
          Share your tips and tricks with the community! Your contributions help
          others learn and grow.
        </p>
      </div>
    </div>
  </div>
</template>
