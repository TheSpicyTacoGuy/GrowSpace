<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePlantNotifications } from "@composables/usePlantNotifications.js";

const router = useRouter();
const isOpen = ref(false);
const { notifications, unreadCount, markAsRead, markAllAsRead } =
  usePlantNotifications();

// Toggle dropdown visibility
const toggleNotifications = () => {
  isOpen.value = !isOpen.value;
};

// Close dropdown
const closeNotifications = () => {
  isOpen.value = false;
};

// Handle notification click
const handleNotificationClick = (notification) => {
  markAsRead(notification.id);

  // Navigate to plant detail if it's a plant notification
  if (notification.plantId) {
    router.push(`/dashboard/plants/${notification.plantId}`);
  }

  closeNotifications();
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
</script>

<template>
  <div class="notification-bell position-relative">
    <button
      class="btn btn-link position-relative"
      @click="toggleNotifications"
      aria-label="Notifications"
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

    <!-- Notification dropdown -->
    <div v-if="isOpen" class="notification-dropdown shadow-lg">
      <div
        class="notification-header d-flex justify-content-between align-items-center p-3 border-bottom"
      >
        <h5 class="mb-0">Notifications</h5>
        <button
          v-if="unreadCount > 0"
          class="btn btn-sm btn-link text-decoration-none"
          @click="markAllAsRead"
        >
          Mark all as read
        </button>
      </div>

      <div
        class="notification-body"
        style="max-height: 400px; overflow-y: auto"
      >
        <div
          v-if="notifications.length === 0"
          class="text-center py-4 text-muted"
        >
          <i class="bi bi-bell-slash fs-4"></i>
          <p class="mt-2">No notifications yet</p>
        </div>

        <div v-else>
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item p-3 border-bottom"
            :class="{ unread: !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <div class="d-flex">
              <div class="notification-icon me-3">
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
              <div class="notification-content flex-grow-1">
                <div class="fw-semibold">{{ notification.title }}</div>
                <div class="text-muted small">{{ notification.body }}</div>
                <div class="text-muted x-small mt-1">
                  {{ getRelativeTime(notification.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="notification-footer p-2 border-top">
        <button
          class="btn btn-sm btn-outline-secondary w-100"
          @click="closeNotifications"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-bell {
  position: relative;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  max-width: 100vw;
  background: var(--bs-body-bg);
  border-radius: 8px;
  border: 1px solid var(--bs-border-color);
  z-index: 1050;
}

.notification-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.05);
}

.notification-item.unread {
  background-color: rgba(var(--bs-primary-rgb), 0.1);
}

.notification-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(var(--bs-light-rgb), 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.x-small {
  font-size: 0.75rem;
}
</style>
