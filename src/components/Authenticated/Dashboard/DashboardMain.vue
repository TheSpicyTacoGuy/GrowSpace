<script setup>
import { useBreadcrumbs } from "@composables/useBreadcrumbs.js";
import { useNavigation } from "@components/../composables/useNavigation";
import IconDash from "@components/icons/IconDash.vue";
import IconHouses from "@components/icons/IconHouses.vue";
import IconSeedling from "@components/icons/IconSeedling.vue";
import IconSettings from "@components/icons/IconSettings.vue";
import IconTips from "@components/icons/IconTips.vue";

const { matchedRoutes, breadcrumbLabels, router } = useBreadcrumbs();
const { checkActiveRoute, isActive, navigateTo } = useNavigation();
</script>

<template>
  <div class="dashboard">
    <!-- Header -->
    <nav
      class="container-fluid px-3 navbar bg-body-secondary rounded-5 shadow-sm"
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
    <div class="container-fluid">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb my-4">
          <li
            v-for="(matched, idx) in matchedRoutes"
            :key="matched.path"
            class="breadcrumb-item"
            :class="{ active: idx === matchedRoutes.length - 1 }"
            aria-current="page"
          >
            <a
              v-if="idx !== matchedRoutes.length - 1"
              class="text-primary text-decoration-none"
              href="#"
              @click.prevent="router.push(matched.path)"
            >
              {{ breadcrumbLabels[idx] }}
            </a>
            <span v-else>{{ breadcrumbLabels[idx] }}</span>
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
              <button
                class="btn text-body d-flex flex-column align-items-center"
                :class="isActive('dashboard')"
                @click.prevent="navigateTo('dashboard')"
                v-tooltip
                title="Dashboard"
              >
                <IconDash
                  :class="{
                    'text-primary': checkActiveRoute('dashboard'),
                  }"
                />
              </button>
              <button
                class="btn text-body btn d-flex flex-column align-items-center"
                :class="isActive('greenhouses')"
                @click.prevent="navigateTo('greenhouses')"
                v-tooltip
                title="Greenhouses"
              >
                <IconHouses
                  :class="{
                    'text-primary': checkActiveRoute('greenhouses'),
                  }"
                />
              </button>
              <button
                class="btn text-body btn d-flex flex-column align-items-center"
                :class="isActive('plants')"
                @click.prevent="navigateTo('plants')"
                v-tooltip
                title="Plants"
              >
                <IconSeedling
                  :class="{
                    'text-primary': checkActiveRoute('plants'),
                  }"
                />
              </button>
              <button
                class="btn text-body btn d-flex flex-column align-items-center"
                :class="isActive('tips')"
                @click.prevent="navigateTo('tips')"
                v-tooltip
                title="Tips"
              >
                <IconTips
                  :class="{
                    'text-primary': checkActiveRoute('tips'),
                  }"
                />
              </button>
              <button
                class="btn text-body btn d-flex flex-column align-items-center"
                :class="isActive('settings')"
                @click.prevent="navigateTo('settings')"
                v-tooltip
                title="Settings"
              >
                <IconSettings
                  :class="{
                    'text-primary': checkActiveRoute('settings'),
                  }"
                />
              </button>
            </div>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="col-md-12 ms-sm-auto col-xl-10 px-md-4">
          <div class="container-fluid p-4 bg-body-tertiary rounded-5 shadow-sm">
            <router-view name="dashboard" v-slot="{ Component }">
              <transition appear name="slide-fade" mode="out-in">
                <component :is="Component" class="w-100" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
