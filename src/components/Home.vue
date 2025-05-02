<template>
  <div class="container-fluid p-4 bg-body-tertiary rounded-5 shadow-sm">
    <h1 class="mb-4">GrowSpace</h1>

    <div class="mb-5">
      <p class="lead">
        Thank you for visiting our website! We're dedicated to providing the
        best user experience and services tailored to your needs. Explore our
        features and discover how we can help you achieve your goals. Our team
        is constantly working to improve and expand our offerings.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div
            class="position-relative"
            style="height: 372.94px; overflow: hidden"
          >
            <div
              v-if="!image1Loaded && !image1Failed"
              class="position-absolute top-0 start-0 w-100 h-100 placeholder-glow"
            >
              <span class="placeholder w-100 h-100"></span>
            </div>
            <div
              v-if="image1Failed"
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light"
            >
              <span class="text-center p-4">Featured image</span>
            </div>
            <img
              src="https://picsum.photos/800/600?random=1"
              alt="Featured image"
              class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              @load="image1Loaded = true"
              @error="image1Failed = true"
            />
          </div>
          <div class="card-body">
            <p class="card-text fw-bold">Discover our innovative solutions</p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div
            class="position-relative"
            style="height: 372.94px; overflow: hidden"
          >
            <div
              v-if="!image2Loaded && !image2Failed"
              class="position-absolute top-0 start-0 w-100 h-100 placeholder-glow"
            >
              <span class="placeholder w-100 h-100"></span>
            </div>
            <div
              v-if="image2Failed"
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light"
            >
              <span class="text-center p-4">Services image</span>
            </div>
            <img
              src="https://picsum.photos/800/600?random=2"
              alt="Services image"
              class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              @load="image2Loaded = true"
              @error="image2Failed = true"
            />
          </div>
          <div class="card-body">
            <p class="card-text fw-bold">Explore our premium services</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineOptions({
  name: "HomePage",
});

const image1Loaded = ref(false);
const image2Loaded = ref(false);
const image1Failed = ref(false);
const image2Failed = ref(false);
</script>
