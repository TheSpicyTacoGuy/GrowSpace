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

          <!-- Theme Settings (separate section, not in form) -->
          <section class="mt-5" aria-labelledby="themeLegend">
            <fieldset class="mb-4">
              <legend id="themeLegend" class="form-label fw-semibold mb-2">
                Theme
              </legend>
              <div
                class="btn-group w-100"
                role="group"
                aria-label="Theme selection"
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
                />
                <label
                  class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  for="theme-system"
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
                />
                <label
                  class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  for="theme-light"
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
                />
                <label
                  class="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                  for="theme-dark"
                  tabindex="0"
                >
                  <i class="bi bi-moon"></i>
                  <span class="d-none d-sm-inline">Dark</span>
                </label>
              </div>
            </fieldset>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettings } from "@composables/useSettings.js";
import SettingsHeader from "./SettingsComponents/SettingsHeader.vue";

defineOptions({
  name: "SettingsComponent",
});

const { displayName, email, theme, saveSettings, setTheme } = useSettings();

function applyTheme() {
  setTheme(theme.value);
}
</script>
