<script setup>
import { onMounted } from "vue";
import { useDashboard } from "../../../composables/useDashboard";

// Import components
import DashboardHeader from "./DashboardComponents/DashboardHeader.vue";
import WeatherCard from "./DashboardComponents/WeatherCard.vue";

// Use the dashboard composable
const {
  loading,
  error,
  greenhouseCount,
  plantCount,
  weather,
  weatherError,
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
  <div>
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

    <div v-else>
      <!-- Quick Access Grid -->
      <div class="row g-3 mt-2">
        <!-- Greenhouses Card -->
        <div class="col-6 col-xl-3">
          <router-link to="/dashboard/greenhouses" class="text-decoration-none">
            <div class="card mobile-card h-100 shadow-sm border-0">
              <div class="card-body text-center p-3">
                <div class="icon-bg bg-success bg-opacity-10 mb-2 mx-auto">
                  <i class="bi bi-house-fill text-success fs-3"></i>
                </div>
                <h3 class="card-title h6 mb-0">Greenhouses</h3>
                <div class="small text-muted mt-1">{{ greenhouseCount }} saved</div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Plants Card -->
        <div class="col-6 col-xl-3">
          <router-link to="/dashboard/plants" class="text-decoration-none">
            <div class="card mobile-card h-100 shadow-sm border-0">
              <div class="card-body text-center p-3">
                <div class="icon-bg bg-primary bg-opacity-10 mb-2 mx-auto">
                  <i class="bi bi-flower2 text-primary fs-3"></i>
                </div>
                <h3 class="card-title h6 mb-0">Plants</h3>
                <div class="small text-muted mt-1">{{ plantCount }} tracked</div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Tips Card -->
        <div class="col-6 col-xl-3">
          <router-link to="/dashboard/tips" class="text-decoration-none">
            <div class="card mobile-card h-100 shadow-sm border-0">
              <div class="card-body text-center p-3">
                <div class="icon-bg bg-warning bg-opacity-10 mb-2 mx-auto">
                  <i class="bi bi-lightbulb-fill text-warning fs-3"></i>
                </div>
                <h3 class="card-title h6 mb-0">Tips</h3>
                <div class="small text-muted mt-1">Community advice</div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Settings Card -->
        <div class="col-6 col-xl-3">
          <router-link to="/dashboard/settings" class="text-decoration-none">
            <div class="card mobile-card h-100 shadow-sm border-0">
              <div class="card-body text-center p-3">
                <div class="icon-bg bg-secondary bg-opacity-10 mb-2 mx-auto">
                  <i class="bi bi-gear-fill text-secondary fs-3"></i>
                </div>
                <h3 class="card-title h6 mb-0">Settings</h3>
                <div class="small text-muted mt-1">Account &amp; theme</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Weather Card - Keeping your existing component -->
      <div class="mt-4">
        <WeatherCard :weather="weather" :weatherError="weatherError" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-bg {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.mobile-card {
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.mobile-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05) !important;
}
</style>
