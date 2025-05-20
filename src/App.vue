<script setup>
import { ref, onMounted, watch } from "vue";
import NavTitleBar from "./components/NavTitleBar.vue";
import MobileNavBar from "./components/MobileNavBar.vue";
import PullToRefresh from "./components/PullToRefresh.vue";
import MainFooter from "./components/MainFooter.vue";
import MoveToTopBtn from "./components/MoveToTopBtn.vue";
import LoadingSplash from "./components/LoadingSplash.vue";
import { useUserRole } from "./composables/useUserRole.js";
import { useNotifications } from "@js/Notifications.js";

const isInitialLoading = ref(true);
const { authLoading } = useUserRole();
const { requestPermission } = useNotifications();

// Watch for auth loading to complete
watch(authLoading, (isLoading) => {
  // When auth is done loading, hide the splash screen
  if (!isLoading) {
    isInitialLoading.value = false;
  }
});

onMounted(() => {
  // Request notification permission
  requestPermission();

  // Set a maximum time the splash will show (failsafe)
  setTimeout(() => {
    isInitialLoading.value = false;
  }, 3000); // Max 3 seconds even if auth takes longer
});
</script>

<template>
  <!-- Initial loading splash that only shows on first load -->
  <LoadingSplash :isLoading="isInitialLoading" />

  <!-- Hide NavTitleBar on mobile, show only on lg screens and up -->
  <header class="header-wrapper w-100 d-lg-block">
    <NavTitleBar />
  </header>

  <main>
    <!-- Add different padding for mobile vs desktop -->
    <div id="page-content" class="container-fluid px-3 mx-auto pb-5 pb-lg-0">
      <!-- Add top padding only on mobile to compensate for missing navbar -->
      <div class="min-vh-75 py-4 pt-lg-2">
        <router-view v-slot="component">
          <transition appear name="slide-fade" mode="out-in">
            <component :is="component.Component" class="w-100" />
          </transition>
        </router-view>
      </div>
      <MainFooter class="d-none d-lg-block" />
      <MoveToTopBtn />
    </div>
  </main>

  <!-- Mobile Navigation Bar - visible only on mobile -->
  <MobileNavBar />

  <!-- Pull to Refresh -->
  <PullToRefresh
    class="d-lg-none"
    @refresh="() => $emit('refresh')"
    :disabled="isInitialLoading"
    :isLoading="isInitialLoading"
  />
</template>
