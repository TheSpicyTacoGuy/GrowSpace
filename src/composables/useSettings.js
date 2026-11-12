import { ref, onMounted, watch } from "vue";
import { auth } from "@js/auth/firebase.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { showToast } from "/js/toast";
import { updateProfile } from "firebase/auth";

const db = getFirestore();

// Cookie helpers
function setThemeCookie(theme) {
  document.cookie = `theme=${theme};path=/;max-age=31536000;samesite=lax`;
}
function getThemeCookie() {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const displayName = ref("");
const email = ref("");
const theme = ref("system");
const userRole = ref("user");
const weatherLocation = ref({
  type: "current", // "current" or "manual"
  manual: "",      // e.g., "Melbourne, AU"
  coords: null     // { lat, lon, name, country }
});

// Load from localStorage/cookie if available
function loadWeatherLocation() {
  const stored = localStorage.getItem("weatherLocation");
  if (stored) {
    try {
      weatherLocation.value = JSON.parse(stored);
    } catch {
      // fallback to default
    }
  }
}

function saveWeatherLocation() {
  localStorage.setItem("weatherLocation", JSON.stringify(weatherLocation.value));
}

// Geocode and save coordinates for manual location
async function validateAndSaveWeatherLocation() {
  if (
    weatherLocation.value.type === "manual" &&
    weatherLocation.value.manual.trim() !== ""
  ) {
    try {
      const resp = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(weatherLocation.value.manual)}&count=1&language=en&format=json`
      );
      const data = await resp.json();
      if (!data.results || data.results.length === 0) {
        showToast("Could not find that location. Try a different format, e.g. 'Melbourne, Australia'.", "danger");
        weatherLocation.value.coords = null;
        saveWeatherLocation();
        return false;
      }
      // Save coordinates and display name/country
      weatherLocation.value.coords = {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country
      };
      saveWeatherLocation();
      showToast("Weather location saved!", "success");
      return true;
    } catch {
      showToast("Error looking up location.", "danger");
      weatherLocation.value.coords = null;
      saveWeatherLocation();
      return false;
    }
  } else {
    // If using current location, clear coords
    weatherLocation.value.coords = null;
    saveWeatherLocation();
    return true;
  }
}

function setTheme(newTheme = false, showToastFlag = false) {
  theme.value = newTheme;
  localStorage.setItem("theme", newTheme);
  setThemeCookie(newTheme);

  // Apply theme to <html> for Bootstrap 5+
  const html = document.documentElement;
  html.removeAttribute("data-bs-theme");
  let appliedTheme = newTheme;
  if (newTheme === "system") {
    appliedTheme = getSystemTheme();
  }
  if (appliedTheme === "dark") {
    html.setAttribute("data-bs-theme", "dark");
  } else if (appliedTheme === "light") {
    html.setAttribute("data-bs-theme", "light");
  }

  // Only show toast if explicitly requested (never on load)
  if (showToastFlag) {
    showToast(
      `Theme set to ${newTheme === "system" ? `${appliedTheme} (system)` : newTheme}`,
      "success"
    );
  }
}

export function useSettings() {
  onMounted(async () => {
    if (auth.currentUser) {
      displayName.value = auth.currentUser.displayName || "";
      email.value = auth.currentUser.email || "";

      // Fetch user role from Firestore
      const userRef = doc(db, "userData", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userRole.value = userSnap.data().role || "user";
      }
    }
    // Prefer cookie, fallback to localStorage, then system
    theme.value = getThemeCookie() || localStorage.getItem("theme") || "system";
    setTheme(theme.value, false); // Don't show toast on load

    // Listen for system theme changes if using system theme
    if (theme.value === "system" && window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        setTheme("system", false);
      });
    }

    loadWeatherLocation();
  });

  // Reactively apply theme if changed elsewhere, but skip first run
  let hasMounted = false;
  watch(theme, (val, oldVal) => {
    if (hasMounted && val !== oldVal) {
      setTheme(val, true); // Show toast only on user change
    } else {
      setTheme(val, false); // No toast on first run
      hasMounted = true;
    }
  });

  watch(weatherLocation, saveWeatherLocation, { deep: true });

  const saveSettings = async () => {
    try {
      if (auth.currentUser && displayName.value !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: displayName.value });
      }
      showToast("Settings saved!", "success");
    } catch (err) {
      showToast("Failed to save settings.", "danger");
      console.error(err);
    }
  };

  return {
    displayName,
    email,
    theme,
    userRole, // Export role
    saveSettings,
    setTheme,
    weatherLocation,
    saveWeatherLocation,
    validateAndSaveWeatherLocation, // <-- export this
  };
}