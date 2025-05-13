<script setup>
import { onMounted, ref } from "vue";
import { Tooltip } from "bootstrap";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../js/auth/authFunctions.js";

const router = useRouter();
const currentUser = ref(null);
const auth = getAuth();
const authLoading = ref(true); // Add loading state
const imageLoadError = ref(false); // Track if the User image failed to load

function checkActiveRoute(routeName) {
  return router.currentRoute.value.name === routeName;
}
function isActive(routeName) {
  return checkActiveRoute(routeName) ? "active" : "";
}

// Updated to use vue-router for page navigation
function navigateTo(routeName) {
  if (routeName === "home") {
    router.push("/");
  } else {
    router.push(`/${routeName}`);
  }
}

onMounted(() => {
  // Set up authentication state listener
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    authLoading.value = false; // Set loading to false after checking auth state
  });

  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );
});
</script>

<template>
  <div
    class="container-fluid header-wrapper d-flex flex-wrap border-bottom w-100 align-items-center justify-content-between"
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
            <h5 class="offcanvas-title" id="mobileNavOffcanvasLabel">
              GrowSpace
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
              <li class="nav-item" v-if="currentUser">
                <a
                  class="nav-link"
                  :class="
                    router.currentRoute.value.path.includes('dashboard')
                      ? 'active'
                      : ''
                  "
                  href="#"
                  @click.prevent="navigateTo('dashboard')"
                  data-bs-dismiss="offcanvas"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Vertical Divider -->
      <div class="d-xl-none vr mx-2 my-2"></div>
      <a
        class="navbar-brand text-primary fw-bold"
        href="#"
        @click.prevent="navigateTo('home')"
      >
        GrowSpace</a
      >
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
          <li class="nav-item" v-if="currentUser">
            <a
              class="nav-link"
              :class="
                router.currentRoute.value.path.includes('dashboard')
                  ? 'active'
                  : ''
              "
              href="#"
              @click.prevent="navigateTo('dashboard')"
            >
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
        class="btn btn-outline-primary me-2"
        @click="login()"
        data-bs-toggle="tooltip"
        data-bs-title="Sign In"
      >
        <span>Login</span>
      </button>

      <!-- User Avatar Dropdown (when logged in) -->
      <div
        v-else-if="currentUser && !authLoading"
        class="dropdown me-2"
        data-bs-toggle="tooltip"
        data-bs-title="User Menu"
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
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
        >
          <li>
            <span class="dropdown-item-text">{{
              currentUser.displayName || currentUser.email
            }}</span>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <!-- <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="navigateTo('profile')"
              >Profile</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="navigateTo('account')"
              >Account Settings</a
            >
          </li> -->
          <li v-if="currentUser">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="navigateTo('dashboard')"
              >Dashboard</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="logout()"
              >Logout</a
            >
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
    </div>
  </div>
</template>
