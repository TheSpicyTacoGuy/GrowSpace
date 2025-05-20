<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePlantNotifications } from "@composables/usePlantNotifications.js";

const router = useRouter();
const showConfirmation = ref(false);
const {
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
  loadNotifications,
  clearAllNotifications,
} = usePlantNotifications();

// Show confirmation dialog
const confirmClearAll = () => {
  showConfirmation.value = true;
};

// Clear all notifications after confirmation
const handleClearAll = async () => {
  await clearAllNotifications();
  showConfirmation.value = false;
};

// Handle notification click
const handleNotificationClick = (notification) => {
  markAsRead(notification.id);

  // Navigate to plant detail if it's a plant notification
  if (notification.plantId) {
    router.push(`/dashboard/plants/${notification.plantId}`);
  }
};

// Format relative time for notifications
const getRelativeTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

// Load notifications only once when component is mounted
onMounted(() => {
  loadNotifications();
});
</script>

<template>
  <div class="dropdown">
    <!-- Notification Bell Button -->
    <button
      class="btn btn-link position-relative"
      id="notificationDropdown"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      aria-expanded="false"
      aria-label="Notifications"
      title="Notifications"
    >
      <i class="bi bi-bell fs-5"></i>
      <span
        v-if="unreadCount > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{ unreadCount > 99 ? "99+" : unreadCount }}
        <span class="visually-hidden">unread notifications</span>
      </span>
    </button>

    <!-- Notification Dropdown Menu -->
    <div
      class="dropdown-menu dropdown-menu-end shadow-lg notification-dropdown"
      aria-labelledby="notificationDropdown"
    >
      <!-- Header with actions -->
      <div
        class="d-flex justify-content-between align-items-center p-3 border-bottom bg-body-tertiary"
      >
        <h5 class="mb-0">Notifications</h5>
        <div class="d-flex gap-2">
          <button
            v-if="unreadCount > 0"
            class="btn btn-sm btn-link text-decoration-none"
            @click="markAllAsRead"
          >
            Mark all as read
          </button>
          <button
            v-if="notifications.length > 0"
            title="Clear all notifications"
            class="btn btn-sm btn-link text-decoration-none text-danger"
            @click="confirmClearAll"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <!-- Confirmation Dialog -->
      <div
        v-if="showConfirmation"
        class="p-3 border-bottom confirmation-dialog"
      >
        <p class="mb-3">Are you sure you want to clear all notifications?</p>
        <div class="d-flex justify-content-end gap-2">
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="showConfirmation = false"
          >
            Cancel
          </button>
          <button class="btn btn-sm btn-danger" @click="handleClearAll">
            Clear All
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="overflow-auto notification-list">
        <div
          v-if="notifications.length === 0"
          class="text-center py-4 text-muted"
        >
          <i class="bi bi-bell-slash fs-4"></i>
          <p class="mt-2">No notifications yet</p>
        </div>

        <div v-else>
          <a
            v-for="notification in notifications"
            :key="notification.id"
            href="#"
            class="dropdown-item p-3 border-bottom notification-item"
            :class="{ 'bg-body-secondary': !notification.read }"
            @click.prevent="handleNotificationClick(notification)"
          >
            <div class="d-flex">
              <div
                class="d-flex align-items-center justify-content-center rounded-circle me-3 notification-icon"
              >
                <i
                  class="bi"
                  :class="{
                    'bi-droplet-fill text-primary':
                      notification.type === 'water',
                    'bi-flower1 text-warning':
                      notification.type === 'fertiliser',
                    'bi-bell-fill text-secondary': !notification.type,
                  }"
                ></i>
              </div>
              <div class="flex-grow-1">
                <div class="fw-semibold">{{ notification.title }}</div>
                <div class="text-muted small">{{ notification.body }}</div>
                <div class="text-muted fs-6 mt-1">
                  {{ getRelativeTime(notification.createdAt) }}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Close Button -->
      <div class="p-2 border-top">
        <button
          class="btn btn-sm btn-outline-secondary w-100"
          data-bs-toggle="dropdown"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
