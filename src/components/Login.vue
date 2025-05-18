<template>
  <div class="login-page-root w-100">
    <!-- Background image sits behind everything -->
    <div class="login-bg-container mh-100" aria-hidden="true">
      <img
        src="@assets/images/thomas-verbruggen-cVYLIzF6Gh0-unsplash.jpg"
        alt=""
        class="login-bg-image"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
    </div>
    <!-- Login content is centered, but does not cover the nav -->
    <div
      class="container d-flex flex-column align-items-center justify-content-center login-content"
    >
      <button
        class="btn btn-secondary position-absolute top-0 start-0 m-3"
        @click="() => $router.back()"
        type="button"
      >
        <i class="bi bi-arrow-left"></i>
        <span class="d-none d-md-inline"> Back</span>
      </button>
      <div class="card shadow p-4" style="max-width: 400px; width: 100%">
        <div
          class="logo-container d-flex flex-column align-items-center justify-content-center mb-4"
        >
          <h1 class="logo-text text-primary">GrowSpace</h1>
        </div>
        <h3 class="mb-4 text-center">Sign In</h3>
        <hr />
        <button
          class="btn btn-primary w-100 login-btn d-flex align-items-center justify-content-center"
          @click="handleGoogleLogin"
          :disabled="loading"
          type="button"
        >
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          <i class="bi bi-google me-2"></i>
          <span>Sign in with Google</span>
        </button>
        <button
          class="btn btn-secondary w-100 mt-3"
          @click="handleFacebookLogin"
          :disabled="loading"
          type="button"
        >
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          <i class="bi bi-facebook me-2"></i>
          <span>Sign in with Facebook</span>
        </button>
        <p class="text-center mt-3">
          By signing in, you agree to our
          <a href="/terms" class="text-primary"> Terms of Service</a> and
          <a href="/privacy" class="text-primary"> Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login, loginWithFacebook } from "../js/auth/authFunctions.js";

defineOptions({
  name: "LoginForm",
});

const loading = ref(false);

const handleGoogleLogin = async () => {
  loading.value = true;
  try {
    await login();
  } finally {
    loading.value = false;
  }
};

const handleFacebookLogin = async () => {
  loading.value = true;
  try {
    await loginWithFacebook();
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-bg-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.login-bg-image {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: brightness(0.7) blur(2px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
}
.login-content {
  position: relative;
  z-index: 1;
  min-height: 75vh;
}
.card {
  border-radius: 1.25rem;
  backdrop-filter: blur(2px);
}
</style>
