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
        <p class="text-muted">
          <i class="bi bi-clock me-1"></i>Updated: {{ weather.updatedAt }}
        </p>
      </div>
      <div v-else class="text-center py-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading weather data...</p>
      </div>
    </div>
  </div>
</template>
