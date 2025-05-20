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
  icon: String,
  iconClass: {
    type: String,
    default: "bg-light text-primary bg-opacity-25 rounded-circle",
  },
  badge: String,
  badge2: String,
  badgeClass: {
    type: String,
    default: "bg-secondary",
  },
  badgeClass2: {
    type: String,
    default: "bg-secondary",
  },
  action: Function,
  actionIcon: String,
  badges: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="card mb-3 mobile-card shadow-sm border-0" @click="$emit('click')">
    <div class="d-flex align-items-center p-3">
      <!-- Left side - icon or image -->
      <div class="me-3 flex-shrink-0">
        <!-- Use custom icon slot if provided -->
        <slot name="icon">
          <!-- Fallback to image if provided -->
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt || title"
            class="rounded"
            width="50"
            height="50"
          />
          <!-- Fallback to icon if provided -->
          <div
            v-else-if="icon"
            class="rounded-circle p-3 circle-icon"
            :class="'bg-opacity-25 rounded-circle ' + iconClass"
          >
            <i class="bi fs-4" :class="icon"></i>
          </div>
        </slot>
      </div>

      <!-- Middle - content area -->
      <div class="flex-grow-1">
        <!-- Title bar with optional badge badge -->
        <div class="mb-1">
          <h6 v-if="title" class="mb-0 fw-bold me-2">{{ title }}</h6>

          <!-- badge badge if provided -->
          <span
            v-if="badge"
            class="badge rounded-pill ms-auto me-2"
            :class="badgeClass"
          >
            {{ badge }}
          </span>
          <span
            v-if="badge2"
            class="badge rounded-pill ms-auto"
            :class="badgeClass2"
          >
            {{ badge2 }}
          </span>
        </div>

        <!-- Subtitle -->
        <p
          v-if="subtitle"
          class="mb-1 small text-secondary d-block text-truncate"
          style="max-width: 200px"
        >
          {{ subtitle }}
        </p>

        <!-- Primary content slot -->
        <slot></slot>

        <!-- Badges area -->
        <div
          v-if="badges && badges.length > 0"
          class="mt-2 d-flex flex-wrap gap-1"
        >
          <span
            v-for="(badge, index) in badges"
            :key="index"
            class="badge rounded-pill"
            :class="badge.class || 'bg-secondary'"
          >
            <i v-if="badge.icon" class="bi me-1" :class="badge.icon"></i>
            {{ badge.text }}
          </span>
        </div>

        <!-- Custom badges slot -->
        <slot name="badges"></slot>
      </div>

      <!-- Right side - actions and chevron -->
      <div class="d-flex align-items-center">
        <!-- Actions slot -->
        <slot name="actions"></slot>

        <!-- Chevron if enabled -->
        <div v-if="showChevron" class="text-secondary ms-3">
          <i class="bi bi-chevron-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
}

.mobile-card:active {
  transform: scale(0.98);
}

.circle-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Badge styling */
.badge {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.35em 0.65em;
}

/* Only apply fixed height to images, not icons */
img {
  object-fit: cover;
}
</style>
