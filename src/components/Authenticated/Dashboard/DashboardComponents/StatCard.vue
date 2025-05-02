<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconBgClass: {
    type: String,
    default: "bg-primary bg-opacity-10",
  },
  iconTextClass: {
    type: String,
    default: "text-primary",
  },
  description: {
    type: String,
    default: "",
  },
});

defineOptions({
  name: "StatCard",
});
</script>

<template>
  <div class="card h-100 border-0 shadow-sm hover-card">
    <div class="card-body text-center">
      <div :class="`icon-circle ${iconBgClass} mb-3`">
        <i :class="`bi bi-${icon} ${iconTextClass}`"></i>
      </div>
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text display-4 fw-bold">{{ count }}</p>
      <p class="text-muted" v-if="description">
        <i class="bi bi-info-circle me-1"></i>{{ description }}
      </p>
    </div>
  </div>
</template>
