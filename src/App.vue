<script setup>
import { ref, onMounted, watch } from "vue";
import NavTitleBar from "./components/NavTitleBar.vue";
import MainFooter from "./components/MainFooter.vue";
import MoveToTopBtn from "./components/MoveToTopBtn.vue";
import LoadingSplash from "./components/LoadingSplash.vue";
import { useUserRole } from "./composables/useUserRole.js";

const isInitialLoading = ref(true);
const { authLoading } = useUserRole();

// Watch for auth loading to complete
watch(authLoading, (isLoading) => {
  // When auth is done loading, hide the splash screen
  if (!isLoading) {
    isInitialLoading.value = false;
  }
});

onMounted(() => {
  // Set a maximum time the splash will show (failsafe)
  setTimeout(() => {
    isInitialLoading.value = false;
  }, 3000); // Max 3 seconds even if auth takes longer
});
</script>

<template>
  <!-- Initial loading splash that only shows on first load -->
  <LoadingSplash :isLoading="isInitialLoading" />

  <header class="header-wrapper w-100">
    <NavTitleBar />
  </header>
  <main>
    <div id="page-content" class="container-fluid px-3 mx-auto">
      <div style="min-height: 70vh" class="py-4">
        <router-view v-slot="component">
          <transition appear name="fade" mode="out-in">
            <component :is="component.Component" class="w-100" />
          </transition>
        </router-view>
      </div>
      <MainFooter />
      <MoveToTopBtn />
    </div>
  </main>
</template>
