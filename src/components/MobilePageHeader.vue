<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Props for the header component
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  showBackButton: {
    type: Boolean,
    default: false,
  },
  // Custom path for back button (default is router.back())
  backTo: {
    type: String,
    default: null,
  },
  // App-like primary action button (e.g., Add, Search)
  actionIcon: {
    type: String,
    default: null,
  },
  // Secondary action button
  secondaryIcon: {
    type: String,
    default: null,
  },
});

// Emit events for actions
const emit = defineEmits(["action", "secondaryAction"]);

const goBack = () => {
  if (props.backTo) {
    router.push(props.backTo);
  } else {
    router.back();
  }
};
</script>

<template>
  <div class="mobile-page-header d-block d-lg-none">
    <div class="d-flex align-items-center justify-content-between">
      <!-- Back button area -->
      <div class="header-left">
        <button
          v-if="showBackButton"
          class="btn btn-icon"
          @click="goBack"
          aria-label="Back"
        >
          <i class="bi bi-arrow-left fs-4"></i>
        </button>
      </div>

      <!-- Page title -->
      <h1 class="header-title text-truncate mb-0">{{ title }}</h1>

      <!-- Action buttons area -->
      <div class="header-actions d-flex">
        <button
          v-if="secondaryIcon"
          class="btn btn-icon me-2"
          @click="$emit('secondaryAction')"
          :aria-label="secondaryIcon"
        >
          <i :class="`bi bi-${secondaryIcon} fs-5`"></i>
        </button>

        <button
          v-if="actionIcon"
          class="btn btn-icon"
          @click="$emit('action')"
          :aria-label="actionIcon"
        >
          <i :class="`bi bi-${actionIcon} fs-5`"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-page-header {
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 1020;
}

.header-left,
.header-actions {
  min-width: 40px;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
  text-align: center;
  margin: 0 8px;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: var(--bs-body-color);
  border: none;
  background: transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.btn-icon:active {
  background-color: var(--bs-gray-200);
  transform: scale(0.95);
}
</style>
