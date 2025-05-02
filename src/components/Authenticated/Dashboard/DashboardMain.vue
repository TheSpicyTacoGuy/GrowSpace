<script setup>
import { onMounted } from "vue";
import { Tooltip } from "bootstrap";
import { useRouter } from "vue-router";
import IconDash from "../../icons/IconDash.vue";
import IconHouses from "../../icons/IconHouses.vue";
import IconSeedling from "../../icons/IconSeedling.vue";
import IconSettings from "../../icons/IconSettings.vue";

const router = useRouter();

function checkActiveRoute(routeName) {
  return router.currentRoute.value.name === routeName;
}
function isActive(routeName) {
  return checkActiveRoute(routeName) ? "active" : "";
}

function getPageDisplayName(routeName) {
  const pageNames = {
    dashboard: "Dashboard",
    greenhouses: "Greenhouses",
    "greenhouse-detail": "Greenhouses / Greenhouse Detail",
    plants: "Plants",
    "plant-detail": "Plants / Plant Detail",
    settings: "Settings",
  };
  return pageNames[routeName] || routeName;
}

function navigateTo(routeName) {
  if (routeName === "dashboard") {
    router.push("/dashboard");
  } else {
    router.push(`/dashboard/${routeName}`);
  }
}

onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );
});
</script>
<template>
  <div class="dashboard container-fluid">
    <!-- Header -->
    <nav class="navbar bg-body-secondary mb-4 rounded-5 shadow-sm">
      <div class="container-fluid">
        <a
          class="navbar-brand"
          href="#"
          @click.prevent="navigateTo('dashboard')"
          >Dashboard</a
        >
      </div>
    </nav>
    <!-- BreadCrumb -->
    <div class="container-fluid">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <a
              class="text-primary text-decoration-none"
              href="#"
              @click.prevent="navigateTo('dashboard')"
              >Dashboard</a
            >
          </li>
          <li
            v-if="router.currentRoute.value.name !== 'dashboard'"
            class="breadcrumb-item active"
            aria-current="page"
          >
            {{ getPageDisplayName(router.currentRoute.value.name) }}
          </li>
        </ol>
      </nav>
    </div>
    <div class="container-fluid">
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
                    ><IconDash class="mx-2" />Dashboard</a
                  >
                  <span
                    class="position-relative d-block border-bottom border-2 bottom-0 w-100 border-primary"
                    v-if="isActive('dashboard')"
                  ></span>
                </li>
                <li class="nav-item w-100 d-block overflow-hidden">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('greenhouses')"
                    href="#"
                    @click.prevent="navigateTo('greenhouses')"
                    ><IconHouses class="mx-2" />Greenhouses</a
                  >
                  <span
                    class="position-relative d-block border-bottom border-2 bottom-0 w-100 border-primary"
                    v-if="isActive('greenhouses')"
                  ></span>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('plants')"
                    href="#"
                    @click.prevent="navigateTo('plants')"
                    ><IconSeedling class="mx-2" />Plants</a
                  >
                  <span
                    class="d-block border-bottom border-2 bottom-0 w-100 border-primary"
                    v-if="isActive('plants')"
                  ></span>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link text-truncate ellipsis"
                    :class="isActive('settings')"
                    href="#"
                    @click.prevent="navigateTo('settings')"
                    ><IconSettings class="mx-2" />Settings</a
                  >
                  <span
                    class="d-block border-bottom border-2 bottom-0 w-100 border-primary"
                    v-if="isActive('settings')"
                  ></span>
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

        <!-- Sidebar Mobile -->
        <nav
          class="fixed-bottom m-auto mb-2 navbar navbar-dark bg-body-secondary d-xl-none py-2 rounded-5 shadow-lg col-12 col-md-10 col-lg-10"
          id="sidebarMenuMobile"
        >
          <div class="container-fluid">
            <div class="d-flex justify-content-around w-100">
              <button
                class="btn"
                :class="isActive('dashboard')"
                @click.prevent="navigateTo('dashboard')"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Dashboard"
                tooltip="Dashboard"
                tooltip-placement="top"
              >
                <IconDash />
                <span
                  class="d-block border-bottom border-2 bottom-0 w-100 border-primary"
                  v-if="isActive('dashboard')"
                ></span>
              </button>
              <button
                class="btn"
                :class="isActive('greenhouses')"
                @click.prevent="navigateTo('greenhouses')"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Greenhouses"
                tooltip="Greenhouses"
              >
                <IconHouses />
                <span
                  class="d-block border-bottom border-2 bottom-0 w-100 border-primary"
                  v-if="isActive('greenhouses')"
                ></span>
              </button>
              <button
                class="btn text-body"
                :class="isActive('plants')"
                @click.prevent="navigateTo('plants')"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Plants"
                tooltip="Plants"
              >
                <IconSeedling />
                <span
                  class="d-block border-bottom border-2 bottom-0 w-100 border-primary"
                  v-if="isActive('plants')"
                ></span>
              </button>
              <button
                class="btn text-body"
                :class="isActive('settings')"
                @click.prevent="navigateTo('settings')"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Settings"
                tooltip="Settings"
              >
                <IconSettings />
                <span
                  class="d-block border-bottom border-2 bottom-0 w-100 border-primary"
                  v-if="isActive('settings')"
                ></span>
              </button>
            </div>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-12 ms-sm-auto col-xl-10 px-md-4">
          <div class="container-fluid p-4 bg-body-tertiary rounded-5 shadow-sm">
            <router-view name="dashboard"></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
