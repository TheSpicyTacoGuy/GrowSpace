<script setup>
defineProps({
  title: String,
  subtitle: String,
  imageSrc: String,
  imageAlt: String,
  showChevron: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="card mb-3 mobile-card shadow-sm border-0">
    <div class="d-flex align-items-center p-3">
      <div v-if="imageSrc" class="me-3 flex-shrink-0">
        <img
          :src="imageSrc"
          :alt="imageAlt || title"
          class="rounded"
          width="50"
          height="50"
        />
      </div>
      <div class="flex-grow-1">
        <h6 v-if="title" class="mb-1 fw-bold">{{ title }}</h6>
        <p v-if="subtitle" class="mb-0 small text-secondary">{{ subtitle }}</p>
        <slot></slot>
      </div>
      <div v-if="showChevron" class="text-secondary">
        <i class="bi bi-chevron-right"></i>
      </div>
    </div>
  </div>
</template>
