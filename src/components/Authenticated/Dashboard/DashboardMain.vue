<script setup>
import { useBreadcrumbs } from "@composables/useBreadcrumbs.js";
import { useNavigation } from "@components/../composables/useNavigation";
import IconDash from "@components/icons/IconDash.vue";
import IconHouses from "@components/icons/IconHouses.vue";
import IconSeedling from "@components/icons/IconSeedling.vue";
import IconSettings from "@components/icons/IconSettings.vue";
import IconTips from "@components/icons/IconTips.vue";
import { ref } from "vue";

const { matchedRoutes, breadcrumbLabels, router } = useBreadcrumbs();
const { checkActiveRoute, isActive, navigateTo } = useNavigation();

// State to track which button is being long-pressed
const pressedButton = ref(null);
const longPressTimeout = ref(null);

// Long press handlers
const startLongPress = (buttonName) => {
  clearTimeout(longPressTimeout.value);
  longPressTimeout.value = setTimeout(() => {
    pressedButton.value = buttonName;
  }, 500); // 500ms hold to trigger
};

const endLongPress = () => {
  clearTimeout(longPressTimeout.value);
  pressedButton.value = null;
};

// Handle navigation with the long press logic
const handleNavClick = (buttonName) => {
  clearTimeout(longPressTimeout.value);
  pressedButton.value = null;
  navigateTo(buttonName);
};
</script>

<template>
  <div class="dashboard">
    <!-- Header -->
    <nav
      class="container-fluid px-2 px-md-3 navbar bg-body-secondary rounded-5 shadow-sm"
    >
      <div>
        <a
          class="navbar-brand"
          href="#"
          @click.prevent="navigateTo('dashboard')"
          >Dashboard</a
        >
      </div>
    </nav>
    <!-- BreadCrumb -->
    <div class="container-fluid px-2 px-md-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb my-4">
          <li
            v-for="(label, idx) in breadcrumbLabels"
            :key="idx"
            class="breadcrumb-item"
            :class="{ active: idx === breadcrumbLabels.length - 1 }"
            aria-current="page"
          >
            <a
              v-if="idx !== breadcrumbLabels.length - 1"
              href="#"
              class="text-primary text-decoration-none"
              @click.prevent="router.push(matchedRoutes[idx].path)"
            >
              {{ label }}
            </a>
            <span v-else>{{ label }}</span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="container-fluid px-2 px-md-3">
      <div class="row">
        <!-- Sidebar Desktop -->
        <nav
          class="navbar navbar-expand-lg col-md-12 col-xl-2 col-sm-4 d-none d-xl-block sidebar rounded-5 bg-body-tertiary min-vh-100 shadow-sm"
          id="sidebarMenu"
        >
          <div class="position-sticky top-0 py-2 container-fluid">
            <div
              class="navbar-collapse collapse justify-content-center"
              id="navbarNav"
            >
              <ul class="navbar-nav flex-column w-100">
                <li class="nav-item">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('dashboard')"
                    href="#"
                    @click.prevent="navigateTo('dashboard')"
                    ><IconDash
                      class="mx-2"
                      :class="{ 'text-primary': checkActiveRoute('dashboard') }"
                    />Dashboard</a
                  >
                </li>
                <li class="nav-item w-100 d-block overflow-hidden">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('greenhouses')"
                    href="#"
                    @click.prevent="navigateTo('greenhouses')"
                    ><IconHouses
                      class="mx-2"
                      :class="{
                        'text-primary': checkActiveRoute('greenhouses'),
                      }"
                    />Greenhouses</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('plants')"
                    href="#"
                    @click.prevent="navigateTo('plants')"
                    ><IconSeedling
                      class="mx-2"
                      :class="{
                        'text-primary': checkActiveRoute('plants'),
                      }"
                    />Plants</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('tips-forum')"
                    href="#"
                    @click.prevent="navigateTo('tips')"
                  >
                    <IconTips
                      class="mx-2"
                      :class="{
                        'text-primary': checkActiveRoute('tips'),
                      }"
                    ></IconTips
                    >Tips
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('settings')"
                    href="#"
                    @click.prevent="navigateTo('settings')"
                    ><IconSettings
                      class="mx-2"
                      :class="{
                        'text-primary': checkActiveRoute('settings'),
                      }"
                    />Settings</a
                  >
                </li>
              </ul>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        <!-- Botton Bar Mobile -->
        <nav
          class="fixed-bottom m-auto mb-2 pb-2 navbar navbar-dark bg-body-secondary d-xl-none py-2 rounded-5 shadow-lg col-12 col-md-10 col-lg-10"
          id="sidebarMenuMobile"
        >
          <div class="container-fluid">
            <div class="d-flex justify-content-around w-100">
              <div
                class="position-relative d-flex flex-column align-items-center"
              >
                <div
                  v-if="pressedButton === 'dashboard'"
                  class="position-absolute label-popup bg-primary text-white px-2 py-1 rounded-pill"
                  style="bottom: 100%; margin-bottom: 5px; white-space: nowrap"
                >
                  Dashboard
                </div>
                <button
                  class="btn text-body d-flex flex-column align-items-center"
                  :class="isActive('dashboard')"
                  @click="handleNavClick('dashboard')"
                  @touchstart="startLongPress('dashboard')"
                  @touchend="endLongPress"
                  @touchcancel="endLongPress"
                >
                  <IconDash
                    :class="{
                      'text-primary': checkActiveRoute('dashboard'),
                    }"
                  />
                </button>
              </div>

              <div
                class="position-relative d-flex flex-column align-items-center"
              >
                <div
                  v-if="pressedButton === 'greenhouses'"
                  class="position-absolute label-popup bg-primary text-white px-2 py-1 rounded-pill"
                  style="bottom: 100%; margin-bottom: 5px; white-space: nowrap"
                >
                  Greenhouses
                </div>
                <button
                  class="btn text-body btn d-flex flex-column align-items-center"
                  :class="isActive('greenhouses')"
                  @click="handleNavClick('greenhouses')"
                  @touchstart="startLongPress('greenhouses')"
                  @touchend="endLongPress"
                  @touchcancel="endLongPress"
                >
                  <IconHouses
                    :class="{
                      'text-primary': checkActiveRoute('greenhouses'),
                    }"
                  />
                </button>
              </div>

              <div
                class="position-relative d-flex flex-column align-items-center"
              >
                <div
                  v-if="pressedButton === 'plants'"
                  class="position-absolute label-popup bg-primary text-white px-2 py-1 rounded-pill"
                  style="bottom: 100%; margin-bottom: 5px; white-space: nowrap"
                >
                  Plants
                </div>
                <button
                  class="btn text-body btn d-flex flex-column align-items-center"
                  :class="isActive('plants')"
                  @click="handleNavClick('plants')"
                  @touchstart="startLongPress('plants')"
                  @touchend="endLongPress"
                  @touchcancel="endLongPress"
                >
                  <IconSeedling
                    :class="{
                      'text-primary': checkActiveRoute('plants'),
                    }"
                  />
                </button>
              </div>

              <div
                class="position-relative d-flex flex-column align-items-center"
              >
                <div
                  v-if="pressedButton === 'tips'"
                  class="position-absolute label-popup bg-primary text-white px-2 py-1 rounded-pill"
                  style="bottom: 100%; margin-bottom: 5px; white-space: nowrap"
                >
                  Tips
                </div>
                <button
                  class="btn text-body btn d-flex flex-column align-items-center"
                  :class="isActive('tips')"
                  @click="handleNavClick('tips')"
                  @touchstart="startLongPress('tips')"
                  @touchend="endLongPress"
                  @touchcancel="endLongPress"
                >
                  <IconTips
                    :class="{
                      'text-primary': checkActiveRoute('tips'),
                    }"
                  />
                </button>
              </div>

              <div
                class="position-relative d-flex flex-column align-items-center"
              >
                <div
                  v-if="pressedButton === 'settings'"
                  class="position-absolute label-popup bg-primary text-white px-2 py-1 rounded-pill"
                  style="bottom: 100%; margin-bottom: 5px; white-space: nowrap"
                >
                  Settings
                </div>
                <button
                  class="btn text-body btn d-flex flex-column align-items-center"
                  :class="isActive('settings')"
                  @click="handleNavClick('settings')"
                  @touchstart="startLongPress('settings')"
                  @touchend="endLongPress"
                  @touchcancel="endLongPress"
                >
                  <IconSettings
                    :class="{
                      'text-primary': checkActiveRoute('settings'),
                    }"
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-12 ms-sm-auto col-xl-10 px-0 px-md-4">
          <div
            class="container-fluid p-3 p-md-4 bg-body-tertiary rounded-5 shadow-sm"
          >
            <router-view name="dashboard" v-slot="{ Component }">
              <transition appear name="slide-fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label-popup {
  transition:
    opacity 0.2s,
    transform 0.2s;
  animation: popIn 0.3s forwards;
  font-size: 0.85rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: translateY(5px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
