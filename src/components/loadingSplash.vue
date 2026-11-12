<!-- src/components/LoadingSplash.vue -->
<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <transition name="fade">
    <div v-if="isLoading" class="loading-splash">
      <div class="loading-content">
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-light">Loading your GrowSpace...</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.loading-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}

.loading-content {
  text-align: center;
}

.spinner-grow {
  width: 3rem;
  height: 3rem;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
