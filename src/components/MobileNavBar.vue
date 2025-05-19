<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserRole } from "@composables/useUserRole.js";

// Import custom icons
import IconDash from "@components/icons/IconDash.vue";
import IconHouses from "@components/icons/IconHouses.vue";
import IconSeedling from "@components/icons/IconSeedling.vue";
import IconSettings from "@components/icons/IconSettings.vue";
import IconTips from "@components/icons/IconTips.vue";

const router = useRouter();
const { currentUser } = useUserRole();
const showMoreMenu = ref(false);

// Items for authenticated users
const authenticatedItems = [
  { icon: "house-fill", name: "Home", route: "/", component: null },
  {
    icon: "dashboard",
    name: "Dashboard",
    route: "/dashboard",
    requiresAuth: true,
    component: IconDash,
  },
  {
    icon: "houses",
    name: "Greenhouses",
    route: "/dashboard/greenhouses",
    requiresAuth: true,
    component: IconHouses,
  },
  {
    icon: "seedling",
    name: "Plants",
    route: "/dashboard/plants",
    requiresAuth: true,
    component: IconSeedling,
  },
];

// Items for unauthenticated users
const unauthenticatedItems = [
  { icon: "house-fill", name: "Home", route: "/", component: null },
  { icon: "info-circle-fill", name: "About", route: "/about", component: null },
  {
    icon: "box-arrow-in-right",
    name: "Sign In",
    route: "/login",
    component: null,
  },
];

// Dynamically use the appropriate navigation items based on auth status
const navItems = computed(() => {
  return currentUser.value ? authenticatedItems : unauthenticatedItems;
});

// More menu items for authenticated users
const authenticatedMoreItems = [
  {
    icon: "tips",
    name: "Tips",
    route: "/dashboard/tips",
    component: IconTips,
  },
  {
    icon: "settings",
    name: "Settings",
    route: "/dashboard/settings",
    component: IconSettings,
  },
];

// More menu items for unauthenticated users
const unauthenticatedMoreItems = [
  {
    icon: "newspaper",
    name: "News",
    route: "/news",
    component: null,
  },
];

// Dynamically use the appropriate more menu items
const moreMenuItems = computed(() => {
  return currentUser.value ? authenticatedMoreItems : unauthenticatedMoreItems;
});

// Keep your improved isActive function
const isActive = (route) => {
  const currentPath = router.currentRoute.value.path;

  // Exact match
  if (currentPath === route) {
    return true;
  }

  // Special case: Dashboard shouldn't be active when on sub-routes
  if (route === "/dashboard" && currentPath.startsWith("/dashboard/")) {
    return false;
  }

  // Special case: For greenhouses and plants routes, only their specific paths should be active
  if (
    (route === "/dashboard/greenhouses" &&
      currentPath.startsWith("/dashboard/greenhouses/")) ||
    (route === "/dashboard/plants" &&
      currentPath.startsWith("/dashboard/plants/"))
  ) {
    return true;
  }

  // For all other cases, use startsWith (for nested routes like /dashboard/greenhouses/123)
  return currentPath.startsWith(route) && route !== "/";
};

const navigateTo = (item) => {
  if (item.requiresAuth && !currentUser.value) {
    router.push("/login");
  } else if (item.name === "Account" && currentUser.value) {
    router.push(item.authRoute);
  } else {
    router.push(item.route);
    if (showMoreMenu.value) showMoreMenu.value = false;
  }
};
</script>

<template>
  <nav
    class="mobile-nav d-block d-lg-none shadow-lg border-top-0 bg-body rounded-5 mb-3 w-100 position-fixed z-index-1030"
  >
    <div class="d-flex justify-content-around align-items-center">
      <div
        v-for="item in navItems"
        :key="item.name"
        class="nav-item d-flex flex-column align-items-center py-2 px-1"
        :class="{
          'text-primary': isActive(item.route),
          'text-muted': !isActive(item.route),
          active: isActive(item.route),
        }"
        @click="navigateTo(item)"
      >
        <div class="mb-1 nav-icon">
          <!-- Use custom component if available, fallback to Bootstrap icon -->
          <component
            v-if="item.component"
            :is="item.component"
            :class="{ 'icon-active': isActive(item.route) }"
          />
          <i v-else :class="`bi bi-${item.icon} fs-1`"></i>
        </div>
        <span class="nav-label small">{{ item.name }}</span>
      </div>

      <!-- More menu button -->
      <div
        class="nav-item d-flex flex-column align-items-center py-2 px-1"
        :class="{
          'text-primary': showMoreMenu,
          'text-secondary': !showMoreMenu,
        }"
        @click="showMoreMenu = !showMoreMenu"
      >
        <div class="mb-1">
          <i class="bi bi-three-dots fs-5"></i>
        </div>
        <span class="nav-label small">More</span>
      </div>
    </div>

    <!-- More menu panel -->
    <div
      v-if="showMoreMenu"
      class="more-menu bg-body shadow-lg rounded-5 p-3 mb-3"
    >
      <div class="list-group list-group-flush">
        <router-link
          v-for="item in moreMenuItems"
          :key="item.name"
          :to="item.route"
          class="list-group-item list-group-item-action border-0 d-flex align-items-center"
          @click="showMoreMenu = false"
        >
          <div class="me-3">
            <component v-if="item.component" :is="item.component" />
            <i v-else :class="`bi bi-${item.icon}`"></i>
          </div>
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>

  <!-- Backdrop for more menu -->
  <div
    v-if="showMoreMenu"
    class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
    style="z-index: 1029"
    @click="showMoreMenu = false"
  ></div>
</template>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bs-body-bg);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top: 1px solid var(--bs-border-color);
  z-index: 1030;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-container {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  color: var(--bs-secondary);
  transition: color 0.3s;
}

.nav-item.active {
  color: var(--bs-primary);
}

.icon-container {
  font-size: 20px;
  margin-bottom: 4px;
}

.nav-label {
  font-size: 12px;
}

.more-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding-bottom: 8px;
  z-index: 1030;
}

/* Icon sizing for consistent display */
.nav-icon {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-active :deep(svg path) {
  fill: var(--bs-primary);
}
</style>
