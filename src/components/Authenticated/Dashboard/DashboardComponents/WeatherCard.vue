<script setup>
defineProps({
  weather: {
    type: Object,
    required: true,
  },
});

defineOptions({
  name: "WeatherCard",
});
</script>

<template>
  <div class="card h-100 border-0 shadow-sm hover-card">
    <div class="card-body text-center">
      <div class="icon-circle bg-info bg-opacity-10 mb-3">
        <i class="bi bi-cloud-sun text-info"></i>
      </div>
      <h5 class="card-title">Current Weather</h5>
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
          <div class="forecast-container d-flex justify-content-center">
            <div
              v-for="(day, index) in weather.forecast"
              :key="index"
              class="forecast-day text-center"
            >
              <div class="fw-bold">{{ day.day }}</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-container {
  display: flex;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scrollbar-width: thin;
  gap: 8px;
}

.forecast-day {
  flex: 0 0 auto;
  min-width: 75px;
  padding: 8px 5px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

/* Improve scrollbar appearance */
.forecast-container::-webkit-scrollbar {
  height: 4px;
}

.forecast-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.temp-range {
  display: flex;
  justify-content: center;
  gap: 4px;
}
</style>
