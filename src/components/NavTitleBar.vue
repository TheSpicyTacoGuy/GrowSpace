<script setup>
import { useRouter } from "vue-router";
import { logout } from "../js/auth/authFunctions.js";
import { ref } from "vue"; // Remove onMounted if it's no longer needed elsewhere
import { useUserRole } from "@composables/useUserRole.js";
import NotificationBell from "./NotificationBell.vue";

const router = useRouter();
const imageLoadError = ref(false);

const { userRole, currentUser, authLoading } = useUserRole();

function checkActiveRoute(routeName) {
  return router.currentRoute.value.name === routeName;
}
function isActive(routeName) {
  return checkActiveRoute(routeName) ? "active" : "";
}
function navigateTo(routeName) {
  if (routeName === "home") {
    router.push("/");
  } else {
    router.push(`/${routeName}`);
  }
}
</script>

<template>
  <div
    class="container header-wrapper d-flex flex-wrap w-100 align-items-center justify-content-between bg-body-tertiary shadow-lg rounded-5"
  >
    <nav class="navbar navbar-expand-xl">
      <!-- Mobile Menu Button -->
      <div class="d-xl-none">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileNavOffcanvas"
          aria-controls="mobileNavOffcanvas"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas Component -->
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="mobileNavOffcanvas"
          aria-labelledby="mobileNavOffcanvasLabel"
        >
          <div class="offcanvas-header">
            <img
              src="@assets/images/GrowSpaceLogo.svg"
              alt="GrowSpace Logo"
              class="logo img-fluid"
              style="width: 64px"
            />
            <div class="vr mx-2"></div>
            <h5 class="offcanvas-title" id="mobileNavOffcanvasLabel">
              GrowSpace Menu
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="isActive('home')"
                  href="#"
                  @click.prevent="navigateTo('home')"
                  data-bs-dismiss="offcanvas"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="isActive('news')"
                  href="#"
                  @click.prevent="navigateTo('news')"
                  data-bs-dismiss="offcanvas"
                >
                  News
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="isActive('about')"
                  href="#"
                  @click.prevent="navigateTo('about')"
                  data-bs-dismiss="offcanvas"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Vertical Divider -->
      <div class="d-xl-none vr mx-2 my-2"></div>
      <a
        class="navbar-brand text-primary fw-bold mr-0"
        href="#"
        @click.prevent="navigateTo('home')"
      >
        <img
          src="@assets/images/GrowSpaceLogo.svg"
          alt="GrowSpace Logo"
          class="logo img-fluid"
          style="width: 64px"
      /></a>
      <!-- Full Links for Larger Screens -->
      <nav class="d-none d-xl-flex">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="isActive('home')"
              href="#"
              @click.prevent="navigateTo('home')"
            >
              Home
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="isActive('news')"
              href="#"
              @click.prevent="navigateTo('news')"
            >
              News
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="isActive('about')"
              href="#"
              @click.prevent="navigateTo('about')"
            >
              About
            </a>
          </li>
          <li
            class="nav-item ms-2"
            v-if="
              currentUser &&
              !router.currentRoute.value.path.includes('dashboard')
            "
          >
            <a
              class="nav-link dashboard-btn py-2 px-3 d-flex align-items-center"
              href="#"
              @click.prevent="navigateTo('dashboard')"
            >
              <i class="bi bi-grid-1x2-fill me-2"></i>
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </nav>
    <div class="d-flex align-items-center">
      <!-- Login/Logout Section -->
      <!-- Login Button (when not logged in) -->
      <button
        v-if="!currentUser && !authLoading"
        class="btn btn-primary login-btn d-flex align-items-center"
        @click="navigateTo('login')"
        v-tooltip
        title="Sign in to your account"
      >
        <i class="bi bi-box-arrow-in-right me-2"></i>
        <span>Sign In</span>
      </button>

      <!-- Add a loading state for the login process -->
      <button
        v-else-if="authLoading && !currentUser"
        class="btn btn-primary login-btn"
        disabled
      >
        <span
          class="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span>Signing in...</span>
      </button>

      <!-- User Avatar Dropdown (when logged in) -->
      <div
        v-else-if="currentUser && !authLoading"
        class="dropdown me-2"
        v-tooltip
        title="User Menu"
      >
        <a
          href="#"
          class="d-flex align-items-center text-decoration-none dropdown-toggle"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            v-if="currentUser.photoURL && !imageLoadError"
            :src="currentUser.photoURL"
            alt="User photo"
            class="rounded-circle"
            style="width: 32px; height: 32px"
            @error="imageLoadError = true"
          />
          <div
            v-else
            class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style="width: 32px; height: 32px; font-size: 14px"
          >
            {{
              currentUser.displayName
                ? currentUser.displayName.charAt(0).toUpperCase()
                : "U"
            }}
          </div>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end user-dropdown shadow-lg"
          aria-labelledby="userDropdown"
        >
          <!-- User info header with enhanced styling -->
          <li class="dropdown-user-details p-3 border-bottom">
            <div class="d-flex align-items-center">
              <!-- User avatar/image -->
              <div class="me-3">
                <img
                  v-if="currentUser.photoURL && !imageLoadError"
                  :src="currentUser.photoURL"
                  alt="User photo"
                  class="rounded-circle"
                  style="width: 48px; height: 48px; object-fit: cover"
                  @error="imageLoadError = true"
                />
                <div
                  v-else
                  class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                  style="width: 48px; height: 48px; font-size: 18px"
                >
                  {{
                    currentUser.displayName
                      ? currentUser.displayName.charAt(0).toUpperCase()
                      : "U"
                  }}
                </div>
              </div>

              <!-- User details -->
              <div class="user-info">
                <div class="fw-bold text-truncate" style="max-width: 200px">
                  {{ currentUser.displayName || currentUser.email }}
                </div>
                <div
                  class="text-muted small"
                  v-if="currentUser.displayName && currentUser.email"
                >
                  {{ currentUser.email }}
                </div>
                <div v-if="userRole === 'admin'" class="mt-1">
                  <span class="badge bg-danger">
                    <i class="bi bi-shield-lock-fill me-1"></i> Admin
                  </span>
                </div>
              </div>
            </div>
          </li>

          <!-- Menu items with icons -->
          <li>
            <a
              class="dropdown-item py-2"
              href="#"
              @click.prevent="navigateTo('dashboard')"
            >
              <i class="bi bi-grid-1x2-fill me-2 text-primary"></i>
              Dashboard
            </a>
          </li>
          <li>
            <a
              class="dropdown-item py-2"
              href="#"
              @click.prevent="navigateTo('dashboard/settings')"
            >
              <i class="bi bi-gear-fill me-2 text-primary"></i>
              Settings
            </a>
          </li>

          <!-- Divider -->
          <li><hr class="dropdown-divider" /></li>

          <!-- Logout with icon -->
          <li>
            <a class="dropdown-item py-2" href="#" @click.prevent="logout()">
              <i class="bi bi-box-arrow-right me-2 text-danger"></i>
              Logout
            </a>
          </li>

          <!-- App info in footer -->
          <li
            class="dropdown-item-text small text-muted text-center py-2 mt-1 border-top"
          >
            GrowSpace v1.0
          </li>
        </ul>
      </div>
      <!-- Loading Spinner -->
      <div
        v-if="authLoading && currentUser"
        class="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      ></div>

      <!-- For Desktop version -->
      <div class="d-none d-lg-flex align-items-center">
        <!-- Add notification bell before user menu -->
        <NotificationBell v-if="currentUser" class="me-2" />
      </div>

      <!-- For Mobile version -->
      <div class="d-flex d-lg-none align-items-center">
        <NotificationBell v-if="currentUser" class="me-2" />
      </div>
    </div>
  </div>
</template>
