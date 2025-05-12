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

import { ref, onMounted, watch, computed, onBeforeUnmount } from "vue";
import RainEffect from "@js/weatherEffects/RainEffect.js";
import SnowEffect from "@js/weatherEffects/SnowEffect.js"; // Add snow effect import

// Scrollable forecast logic
const scrollPosition = ref(0);
const canScrollLeft = ref(false);
const canScrollRight = ref(true); // Set initially true to show right arrow

// Weather effects logic
const rainEffect = ref(null);
const snowEffect = ref(null); // Add snow effect ref
const effectContainerRef = ref(null);

// Computed property to determine the weather effect class
const weatherEffectClass = computed(() => {
  if (!props.weather.loaded || !props.weather.condition)
    return "weather-effect-default";

  const condition = props.weather.condition.toLowerCase();

  // Define weather conditions in priority order (first match wins)
  const weatherTypes = [
    {
      keywords: ["thunder", "lightning", "storm"],
      effect: "weather-effect-thunder",
    },
    {
      keywords: ["rain", "drizzle", "shower"],
      effect: "weather-effect-rain",
    },
    {
      keywords: ["snow", "sleet", "blizzard"],
      effect: "weather-effect-snow",
    },
    { keywords: ["fog", "mist", "frost"], effect: "weather-effect-fog" },
    {
      keywords: ["clear", "sunny", "partly cloudy"],
      effect: "weather-effect-sunny",
    },
    {
      keywords: ["cloud", "overcast", "partly cloudy"],
      effect: "weather-effect-cloudy",
    },
  ];

  // Find the first matching weather type
  for (const type of weatherTypes) {
    if (type.keywords.some((keyword) => condition.includes(keyword))) {
      return type.effect;
    }
  }

  return "weather-effect-default";
});

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

// Initialize the rain effect once
const initializeRainEffect = () => {
  if (!effectContainerRef.value || rainEffect.value) return;

  try {
    // Add required CSS for rain animation
    RainEffect.addStyles();

    // Create rain effect instance
    rainEffect.value = new RainEffect(effectContainerRef.value);

    // Start the effect if weather is already loaded and it's raining
    if (
      props.weather.loaded &&
      weatherEffectClass.value === "weather-effect-rain"
    ) {
      rainEffect.value.start();
    }
  } catch (error) {
    console.error("Failed to initialize rain effect:", error);
  }
};

// Initialize the snow effect
const initializeSnowEffect = () => {
  if (!effectContainerRef.value || snowEffect.value) return;

  try {
    // Add required CSS for snow animation
    SnowEffect.addStyles();

    // Create snow effect instance
    snowEffect.value = new SnowEffect(effectContainerRef.value);

    // Start the effect if weather is already loaded and it's snowing
    if (
      props.weather.loaded &&
      weatherEffectClass.value === "weather-effect-snow"
    ) {
      snowEffect.value.start();
    }
  } catch (error) {
    console.error("Failed to initialize snow effect:", error);
  }
};

// Watch for weather effects class changes
watch(weatherEffectClass, (newClass) => {
  // Make sure effects are initialized before using them
  if (!rainEffect.value && effectContainerRef.value) {
    initializeRainEffect();
  }

  if (!snowEffect.value && effectContainerRef.value) {
    initializeSnowEffect();
  }

  // Start or stop effects based on weather
  if (rainEffect.value) {
    if (newClass === "weather-effect-rain") {
      rainEffect.value.start();
    } else {
      rainEffect.value.stop();
    }
  }

  if (snowEffect.value) {
    if (newClass === "weather-effect-snow") {
      snowEffect.value.start();
    } else {
      snowEffect.value.stop();
    }
  }
});

// Watch for container existence (for when component mounts later)
watch(effectContainerRef, (container) => {
  if (container) {
    if (!rainEffect.value) {
      initializeRainEffect();
    }
    if (!snowEffect.value) {
      initializeSnowEffect();
    }
  }
});

// Also watch for weather loaded state changes
watch(
  () => props.weather.loaded,
  (isLoaded) => {
    if (isLoaded) {
      // Wait for DOM to update with the forecast data
      setTimeout(() => {
        updateScrollIndicators();

        // Try to initialize effects if needed
        if (!rainEffect.value && effectContainerRef.value) {
          initializeRainEffect();
        }
        if (!snowEffect.value && effectContainerRef.value) {
          initializeSnowEffect();
        }
      }, 100);
    }
  }
);

// Cleanup function
onBeforeUnmount(() => {
  if (rainEffect.value) {
    rainEffect.value.stop();
  }
  if (snowEffect.value) {
    snowEffect.value.stop();
  }
});

onMounted(() => {
  // Scroll container logic
  const container = document.querySelector(".forecast-scroll-container");
  if (container) {
    container.addEventListener("scroll", updateScrollIndicators);
    setTimeout(updateScrollIndicators, 100);
    setTimeout(updateScrollIndicators, 500);
  }

  // Get the effect container reference immediately
  effectContainerRef.value = document.querySelector(
    ".weather-effect-container"
  );

  // Initialize effects with a small delay to ensure DOM is ready
  setTimeout(() => {
    initializeRainEffect();
    initializeSnowEffect();
  }, 50);
});
</script>

<template>
  <div class="card h-100 border-0 shadow position-relative overflow-hidden">
    <!-- Weather Effect Container with ref attribute -->
    <div
      v-if="weather.loaded"
      class="weather-effect-container"
      :class="weatherEffectClass"
      ref="effectContainerRef"
    ></div>
    <div class="card-body text-center position-relative">
      <div class="bg-body-secondary rounded-3 bg-opacity-25">
        <div class="icon-circle bg-white bg-opacity-10 mt-3 mb-3">
          <i class="bi bi-cloud-sun"></i>
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
        <div
          v-if="weather.loaded"
          class="text-center d-flex flex-column align-items-center"
        >
          <div class="weather-display">
            <h2 class="display-4 fw-bold mb-0">{{ weather.temperature }}°C</h2>
            <p class="mb-2 display-6">{{ weather.condition }}</p>
          </div>
          <div class="d-flex align-items-start flex-column">
            <p class="text-muted mb-0">
              <i class="bi bi-droplet me-1"></i>Humidity:
              <b>{{ weather.humidity }}%</b>
            </p>

            <!-- Weekly Rainfall Section (as a single value) -->
            <p
              class="text-muted mb-0"
              v-if="weather.weeklyRainfall !== undefined"
            >
              <i class="bi bi-cloud-rain me-1"></i>
              Rainfall: <b>{{ weather.weeklyRainfall }}mm</b>
            </p>

            <!-- UV Index -->
            <p class="text-muted mb-0" v-if="weather.uvIndex !== undefined">
              <i class="bi bi-sun me-1"></i>UV Index:
              <b>{{ weather.uvIndex }}</b>
            </p>

            <p class="text-muted">
              <i class="bi bi-clock me-1"></i>Updated:
              <b>{{ weather.updatedAt }}</b>
            </p>
          </div>
          <hr class="my-3" />
          <!-- Forecast section with improved layout -->
        </div>
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
          <div class="text-center mt-2">
            <button class="btn btn-link text-decoration-none">
              <a
                href="https://open-meteo.com/"
                target="_blank"
                class="text-decoration-none text-body"
              >
                <i class="bi bi-info-circle me-1"></i>Powered by OpenMateo
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
