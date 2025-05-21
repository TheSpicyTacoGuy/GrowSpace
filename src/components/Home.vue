<template>
  <div class="container p-4 bg-body-tertiary rounded-5 shadow-sm">
    <div class="mb-5">
      <h1 class="display-3 fw-bold mb-3 text-success">GrowSpace</h1>
      <p class="lead mx-auto text-start">
        <span class="fw-semibold text-success">GrowSpace</span> is your smart
        companion for modern gardening and greenhouse management.<br /><br />
        <b
          >Track your plants, monitor your greenhouses, and get real-time
          weather insights</b
        >
        – all in one place.<br />
        Whether you're a beginner or an expert, our platform helps you nurture
        your plants and achieve thriving results.<br /><br />
        Explore our features, discover tips, and let GrowSpace help you grow
        with confidence!
      </p>
    </div>

    <div class="row g-4 justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card h-100 shadow border-0 rounded-4 overflow-hidden">
          <div class="position-relative" style="height: 340px">
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
              <span class="text-center p-4">Plant care image</span>
            </div>
            <img
              src="@assets/images/katya-ross-4Vg6ez9jaec-unsplash.jpg"
              alt="Healthy houseplants"
              class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              style="filter: brightness(0.92) saturate(1.1)"
              @load="image1Loaded = true"
              @error="image1Failed = true"
            />
            <div
              class="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient"
              style="
                background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 0,
                  rgba(0, 0, 0, 0.5) 100%
                );
              "
            >
              <h5 class="text-white fw-bold mb-0">
                Nurture your plants with smart tools
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-5">
        <div class="card h-100 shadow border-0 rounded-4 overflow-hidden">
          <div class="position-relative" style="height: 340px">
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
              <span class="text-center p-4">Greenhouse image</span>
            </div>
            <img
              src="@assets/images/thomas-verbruggen-cVYLIzF6Gh0-unsplash.jpg"
              alt="Greenhouse with plants"
              class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              style="filter: brightness(0.92) saturate(1.1)"
              @load="image2Loaded = true"
              @error="image2Failed = true"
            />
            <div
              class="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient"
              style="
                background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 0,
                  rgba(0, 0, 0, 0.5) 100%
                );
              "
            >
              <h5 class="text-white fw-bold mb-0">
                Manage your greenhouse with ease
              </h5>
            </div>
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
