<script setup>
import useWeatherCard from "@composables/useWeatherCard.js";

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
});

defineOptions({ name: "WeatherCard" });

const {
  canScrollLeft,
  canScrollRight,
  effectContainerRef,
  weatherEffectClass,
  scrollForecast,
} = useWeatherCard(props);
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
        <div class="icon-circle bg-white bg-opacity-10 mt-3 mb-3 rounded-3">
          <i class="bi bi-cloud-sun fs-1 text-white"></i>
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

            <!-- Today's Rainfall Section -->
            <p class="text-muted mb-0">
              <i class="bi bi-cloud-rain me-1"></i>
              Rainfall: <b>{{ weather.todayRainfall }}mm</b>
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
            <div
              class="forecast-scroll-container d-flex flex-row overflow-auto justify-content-evenly"
              style="scroll-behavior: smooth; min-width: 0"
              :style="{ maxWidth: '100%' }"
              ref="forecastScrollContainer"
              @scroll="handleScroll"
            >
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
