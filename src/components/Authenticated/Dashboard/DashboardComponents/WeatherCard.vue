<script setup>
const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
});

defineOptions({
  name: "WeatherCard",
});

import { ref, onMounted, watch } from "vue";

// Scrollable forecast logic
const scrollPosition = ref(0);
const canScrollLeft = ref(false);
const canScrollRight = ref(true); // Set initially true to show right arrow

// Update scroll indicators
const updateScrollIndicators = () => {
  const container = document.querySelector(".forecast-scroll-container");
  if (!container) return;

  scrollPosition.value = container.scrollLeft;
  canScrollLeft.value = container.scrollLeft > 0;

  // Check if we can scroll right (content width is greater than visible width plus current scroll)
  const hasMoreContent =
    container.scrollWidth > container.clientWidth + container.scrollLeft + 75; // 75px buffer
  canScrollRight.value = hasMoreContent;
};

const scrollForecast = (direction) => {
  const forecastContainer = document.querySelector(
    ".forecast-scroll-container"
  );
  const scrollAmount = direction === "left" ? -120 : 120; // Adjust scroll amount as needed
  forecastContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
  updateScrollIndicators();
};

// Watch for changes in weather data and update scroll indicators
watch(
  () => props.weather.loaded,
  (isLoaded) => {
    if (isLoaded) {
      // Wait for DOM to update with the forecast data
      setTimeout(() => {
        updateScrollIndicators();
      }, 200);
    }
  }
);

onMounted(() => {
  const container = document.querySelector(".forecast-scroll-container");
  if (container) {
    container.addEventListener("scroll", updateScrollIndicators);
    // Initial check
    setTimeout(updateScrollIndicators, 100);

    // Additional check after a longer delay to ensure content is fully rendered
    setTimeout(updateScrollIndicators, 500);
  }
});
</script>

<template>
  <div class="card h-100 border-0 shadow-sm hover-card">
    <div class="card-body text-center">
      <div class="icon-circle bg-info bg-opacity-10 mb-3">
        <i class="bi bi-cloud-sun text-info"></i>
      </div>
      <h5 class="card-title">Current Weather</h5>
      <!-- Loading State -->
      <div v-if="!weather.loaded" class="py-4">
        <div class="spinner-border text-info mb-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-muted">Loading weather data...</p>
      </div>
      <!-- Weather Data -->
      <div v-if="weather.loaded">
        <div class="weather-display">
          <h2 class="display-4 fw-bold mb-0">{{ weather.temperature }}°C</h2>
          <p class="mb-2 text-primary">{{ weather.condition }}</p>
        </div>
        <p class="text-muted mb-0">
          <i class="bi bi-droplet me-1"></i>Humidity: {{ weather.humidity }}%
        </p>

        <!-- Weekly Rainfall Section (as a single value) -->
        <p class="text-muted mb-0" v-if="weather.weeklyRainfall !== undefined">
          <i class="bi bi-cloud-rain me-1"></i>Weekly Rainfall:
          {{ weather.weeklyRainfall }}mm
        </p>

        <!-- UV Index -->
        <p class="text-muted mb-0" v-if="weather.uvIndex !== undefined">
          <i class="bi bi-sun me-1"></i>UV Index: {{ weather.uvIndex }}
        </p>

        <p class="text-muted">
          <i class="bi bi-clock me-1"></i>Updated: {{ weather.updatedAt }}
        </p>
        <hr class="my-3" />
        <!-- Forecast section with improved layout -->
        <div
          class="weather-forecast mt-3"
          v-if="weather.forecast && weather.forecast.length"
        >
          <h5 class="mb-2">7-Day Forecast</h5>
          <div class="forecast-container position-relative align-items-center">
            <!-- Left scroll arrow -->
            <button
              class="btn btn-primary scroll-arrow scroll-left position-absolute top-50 start-0 translate-middle-y shadow-lg"
              @click="scrollForecast('left')"
              :class="{ 'd-none': !canScrollLeft }"
            >
              <i class="bi bi-chevron-left"></i>
            </button>

            <!-- Scrollable forecast content -->
            <div class="forecast-scroll-container d-flex overflow-auto">
              <div
                v-for="(day, index) in weather.forecast"
                :key="index"
                class="forecast-day text-center py-2 px-3 mx-1 rounded-3 bg-body-secondary flex-shrink-0"
              >
                <div
                  class="fw-bold"
                  :class="{ 'text-primary': day.day.toLowerCase() === 'today' }"
                >
                  {{ day.day }}
                </div>
                <div class="small text-muted">{{ day.date }}</div>
                <div class="temp-range my-1">
                  <span class="fw-bold">{{ day.tempMax }}°</span>
                  <span class="text-muted">{{ day.tempMin }}°</span>
                </div>
                <div class="small">{{ day.condition }}</div>
                <div class="small text-muted">
                  <i class="bi bi-cloud-rain me-1"></i>{{ day.rainfall }}mm
                </div>
              </div>
            </div>

            <!-- Right scroll arrow -->
            <button
              class="btn btn-primary scroll-arrow scroll-right position-absolute top-50 end-0 translate-middle-y shadow-lg"
              @click="scrollForecast('right')"
              :class="{ 'd-none': !canScrollRight }"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-container {
  position: relative;
  overflow: hidden;
  padding: 0 30px; /* Make room for the arrows */
}

.forecast-scroll-container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding: 8px 0;
}

.forecast-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.forecast-day {
  min-width: 120px; /* Ensure day cards have minimum width */
}

.scroll-arrow {
  z-index: 10;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
}

.scroll-left {
  left: 5px;
}

.scroll-right {
  right: 5px;
}
</style>
