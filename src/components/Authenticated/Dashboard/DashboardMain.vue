<script setup>
import { useNavigation } from "@components/../composables/useNavigation";
import IconDash from "@components/icons/IconDash.vue";
import IconHouses from "@components/icons/IconHouses.vue";
import IconSeedling from "@components/icons/IconSeedling.vue";
import IconSettings from "@components/icons/IconSettings.vue";
import IconTips from "@components/icons/IconTips.vue";

const { checkActiveRoute, isActive, navigateTo } = useNavigation();
</script>

<template>
  <div class="dashboard">
    <div class="container px-2 px-md-3">
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

        <!-- Main Content -->
        <main class="col-md-12 ms-sm-auto col-xl-10 px-0 px-md-4">
          <div
            class="container-fluid p-3 p-md-4 bg-body-tertiary rounded-5 shadow-sm h-100"
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
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s;
}

.btn-icon:hover,
.btn-icon:active {
  background-color: var(--bs-gray-200);
}

/* Enhanced breadcrumb styling */
.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  font-size: 1.1rem;
  line-height: 1;
  vertical-align: middle;
}
</style>
