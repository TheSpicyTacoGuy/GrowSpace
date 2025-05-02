<script setup>
import { onMounted } from "vue";
import { useDashboard } from "../../../composables/useDashboard";

// Import components
import DashboardHeader from "./DashboardComponents/DashboardHeader.vue";
import StatCard from "./DashboardComponents/StatCard.vue";
import WeatherCard from "./DashboardComponents/WeatherCard.vue";

// Use the dashboard composable
const {
  loading,
  error,
  greenhouseCount,
  plantCount,
  weather,
  fetchDashboardStats,
  fetchWeatherData,
} = useDashboard();

// Initialize component
onMounted(async () => {
  await fetchDashboardStats();
  fetchWeatherData();
});

defineOptions({
  name: "DashboardComponent",
});
</script>

<template>
  <div class="dashboard-container p-3">
    <!-- Dashboard Header -->
    <DashboardHeader />

    <div
      v-if="loading && !greenhouseCount && !plantCount"
      class="text-center py-5"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading dashboard data...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="row mt-4">
      <!-- Greenhouse Count Card -->
      <div class="col-md-6 mb-4">
        <router-link to="/dashboard/greenhouses" class="text-decoration-none">
          <StatCard
            title="Greenhouses"
            :count="greenhouseCount"
            icon="building"
            iconBgClass="bg-success bg-opacity-10"
            iconTextClass="text-success"
            description="Total greenhouses managed"
          />
        </router-link>
      </div>

      <!-- Plant Count Card -->
      <div class="col-md-6 mb-4">
        <router-link to="/dashboard/plants" class="text-decoration-none">
          <StatCard
            title="Plants"
            :count="plantCount"
            icon="flower1"
            iconBgClass="bg-primary bg-opacity-10"
            iconTextClass="text-primary"
            description="Total plants cultivated"
          />
        </router-link>
      </div>

      <!-- Weather Card -->
      <div class="col-md-4 mb-4">
        <WeatherCard :weather="weather" />
      </div>
    </div>
  </div>
</template>
