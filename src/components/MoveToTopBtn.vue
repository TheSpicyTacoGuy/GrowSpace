<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import IconArrowUp from "./icons/IconArrowUp.vue";

const isVisible = ref(false);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
}

function toggleVisibility() {
  isVisible.value = window.scrollY > 200;
}

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>

<template>
  <span
    v-show="isVisible"
    class="btn move-to-top-btn position-fixed bottom-0 end-0 m-3"
    @click="scrollToTop"
    aria-label="Move to top"
  >
    <IconArrowUp />
  </span>
</template>
