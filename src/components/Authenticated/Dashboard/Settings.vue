<template>
  <div v-bind="$attrs">
    <SettingsHeader />
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <!-- User Info Form -->
          <form @submit.prevent="saveSettings" aria-labelledby="settings-title">
            <div class="mb-3">
              <label for="displayName" class="form-label fw-semibold"
                >Display Name</label
              >
              <input
                id="displayName"
                v-model="displayName"
                type="text"
                class="form-control"
                placeholder="Your name"
                aria-describedby="displayNameHelp"
                autocomplete="name"
                required
              />
              <div id="displayNameHelp" class="form-text">
                This name will be shown on your profile.
              </div>
            </div>
            <div class="mb-4">
              <label for="email" class="form-label fw-semibold">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control"
                disabled
                aria-readonly="true"
                aria-describedby="emailHelp"
                tabindex="-1"
              />
              <div id="emailHelp" class="form-text">
                Email cannot be changed.
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-success w-100 mt-2"
              aria-label="Save changes"
            >
              <i class="bi bi-save me-1"></i>Save Changes
            </button>
          </form>

          <!-- Theme Settings -->
          <section class="mt-5" aria-labelledby="themeLegend">
            <fieldset class="mb-4">
              <legend id="themeLegend" class="form-label fw-semibold mb-2">
                Theme
              </legend>
              <div
                class="btn-group w-100"
                role="radiogroup"
                aria-labelledby="themeLegend"
              >
                <input
                  type="radio"
                  class="btn-check"
                  name="theme"
                  id="theme-system"
                  value="system"
                  v-model="theme"
                  autocomplete="off"
                  @change="applyTheme"
                  aria-checked="theme === 'system'"
                  aria-labelledby="theme-system-label"
                />
                <label
                  class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  for="theme-system"
                  id="theme-system-label"
                  tabindex="0"
                >
                  <i class="bi bi-laptop"></i>
                  <span class="d-none d-sm-inline">System</span>
                </label>
                <input
                  type="radio"
                  class="btn-check"
                  name="theme"
                  id="theme-light"
                  value="light"
                  v-model="theme"
                  autocomplete="off"
                  @change="applyTheme"
                  aria-checked="theme === 'light'"
                  aria-labelledby="theme-light-label"
                />
                <label
                  class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  for="theme-light"
                  id="theme-light-label"
                  tabindex="0"
                >
                  <i class="bi bi-sun"></i>
                  <span class="d-none d-sm-inline">Light</span>
                </label>
                <input
                  type="radio"
                  class="btn-check"
                  name="theme"
                  id="theme-dark"
                  value="dark"
                  v-model="theme"
                  autocomplete="off"
                  @change="applyTheme"
                  aria-checked="theme === 'dark'"
                  aria-labelledby="theme-dark-label"
                />
                <label
                  class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  for="theme-dark"
                  id="theme-dark-label"
                  tabindex="0"
                >
                  <i class="bi bi-moon"></i>
                  <span class="d-none d-sm-inline">Dark</span>
                </label>
              </div>
            </fieldset>
          </section>

          <!-- Weather Location Settings -->
          <section class="mt-5" aria-labelledby="weatherLocationLegend">
            <fieldset class="mb-4">
              <legend
                id="weatherLocationLegend"
                class="form-label fw-semibold mb-2"
              >
                Weather Location
              </legend>
              <div
                class="mb-2"
                role="radiogroup"
                aria-labelledby="weatherLocationLegend"
              >
                <label for="weather-current">
                  <input
                    id="weather-current"
                    type="radio"
                    value="current"
                    v-model="weatherLocation.type"
                    name="weatherLocation"
                    aria-checked="weatherLocation.type === 'current'"
                  />
                  Use Current Location
                </label>
              </div>
              <div
                class="mb-2"
                role="radiogroup"
                aria-labelledby="weatherLocationLegend"
              >
                <label for="weather-manual">
                  <input
                    id="weather-manual"
                    type="radio"
                    value="manual"
                    v-model="weatherLocation.type"
                    name="weatherLocation"
                    aria-checked="weatherLocation.type === 'manual'"
                  />
                  Set Location Manually
                </label>
                <div class="position-relative">
                  <input
                    v-if="weatherLocation.type === 'manual'"
                    id="manualWeatherLocation"
                    name="manualWeatherLocation"
                    type="text"
                    class="form-control mt-2"
                    placeholder="e.g. Melbourne, Australia"
                    v-model="weatherLocation.manual"
                    autocomplete="off"
                    aria-label="Manual weather location"
                    aria-autocomplete="list"
                    aria-controls="location-suggestions"
                  />
                  <ul
                    v-if="
                      locationSuggestions.length &&
                      weatherLocation.type === 'manual'
                    "
                    id="location-suggestions"
                    class="list-group position-absolute w-100"
                    style="z-index: 10"
                    aria-live="polite"
                    role="listbox"
                  >
                    <li
                      v-for="suggestion in locationSuggestions"
                      :key="suggestion.id"
                      class="list-group-item list-group-item-action"
                      @click="selectSuggestion(suggestion)"
                      style="cursor: pointer"
                      tabindex="0"
                      role="option"
                      :aria-selected="
                        weatherLocation.manual ===
                        `${suggestion.name}, ${suggestion.country}`
                      "
                    >
                      {{ suggestion.name }}, {{ suggestion.country }}
                      <span v-if="suggestion.admin1">
                        ({{ suggestion.admin1 }})
                      </span>
                    </li>
                  </ul>
                  <div
                    v-if="isLoadingSuggestions"
                    class="spinner-border spinner-border-sm text-secondary position-absolute end-0 top-0 mt-3 me-3"
                    role="status"
                    aria-live="polite"
                  ></div>
                </div>
              </div>
            </fieldset>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSettings } from "@composables/useSettings.js";
import SettingsHeader from "./SettingsComponents/SettingsHeader.vue";

defineOptions({
  name: "SettingsComponent",
});

const {
  displayName,
  email,
  theme,
  saveSettings,
  setTheme,
  weatherLocation,
  validateAndSaveWeatherLocation,
} = useSettings();

const locationSuggestions = ref([]);
const isLoadingSuggestions = ref(false);

watch(
  () => weatherLocation.value.manual,
  async (val) => {
    if (weatherLocation.value.type === "manual" && val.trim().length > 2) {
      isLoadingSuggestions.value = true;
      try {
        const resp = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(val)}&count=5&language=en&format=json`
        );
        const data = await resp.json();
        locationSuggestions.value = data.results || [];
      } catch {
        locationSuggestions.value = [];
      } finally {
        isLoadingSuggestions.value = false;
      }
    } else {
      locationSuggestions.value = [];
    }
  }
);

function applyTheme() {
  setTheme(theme.value);
}

async function selectSuggestion(suggestion) {
  weatherLocation.value.manual = `${suggestion.name}, ${suggestion.country}`;
  locationSuggestions.value = [];
  await validateAndSaveWeatherLocation(); // <-- add this line
}
</script>
