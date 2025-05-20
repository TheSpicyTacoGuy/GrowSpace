<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  onRefresh: Function,
  isLoading: Boolean,
  disabled: Boolean,
});

const emit = defineEmits(["refresh"]);

const startY = ref(0);
const distance = ref(0);
const threshold = 80;
const pullArea = ref(null);
const isVisible = ref(false);

// Touch event handlers
const handleTouchStart = (e) => {
  if (props.disabled || window.scrollY > 5) return;
  startY.value = e.touches[0].clientY;
  isVisible.value = true;
};

const handleTouchMove = (e) => {
  if (props.disabled || window.scrollY > 5 || !isVisible.value) return;

  const currentY = e.touches[0].clientY;
  distance.value = Math.max(0, (currentY - startY.value) * 0.5);

  if (pullArea.value) {
    pullArea.value.style.transform = `translateY(${distance.value}px)`;
  }
};

const handleTouchEnd = () => {
  if (!isVisible.value) return;

  if (distance.value >= threshold && !props.isLoading) {
    emit("refresh");
  }

  // Reset
  setTimeout(() => {
    if (pullArea.value) {
      pullArea.value.style.transition = "transform 0.3s ease-out";
      pullArea.value.style.transform = "translateY(0)";
      setTimeout(() => {
        distance.value = 0;
        isVisible.value = false;
        if (pullArea.value) {
          pullArea.value.style.transition = "";
        }
      }, 300);
    }
  }, 10);
};

onMounted(() => {
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", handleTouchEnd);
});

onUnmounted(() => {
  document.removeEventListener("touchstart", handleTouchStart);
  document.removeEventListener("touchmove", handleTouchMove);
  document.removeEventListener("touchend", handleTouchEnd);
});
</script>

<template>
  <div ref="pullArea" class="position-relative">
    <div
      class="position-absolute start-50 translate-middle-x badge rounded-pill bg-body-tertiary shadow-sm pull-indicator z-index-1"
      :class="{ visible: distance >= threshold || props.isLoading }"
    >
      <div
        v-if="props.isLoading"
        class="spinner-border spinner-border-sm me-2"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <i
        v-else
        class="bi me-1"
        :class="distance >= threshold ? 'bi-arrow-clockwise' : 'bi-arrow-down'"
      ></i>
      <span class="small">{{
        props.isLoading
          ? "Refreshing..."
          : distance >= threshold
            ? "Release to refresh"
            : "Pull to refresh"
      }}</span>
    </div>
    <slot></slot>
  </div>
</template>
