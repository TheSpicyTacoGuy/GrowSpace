import { ref, onMounted, watch } from "vue";
import { auth } from "@js/auth/firebase.js";
import { showToast } from "/js/toast";
import { updateProfile } from "firebase/auth";

// Cookie helpers
function setThemeCookie(theme) {
  document.cookie = `theme=${theme};path=/;max-age=31536000;samesite=lax`;
}
function getThemeCookie() {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const displayName = ref("");
const email = ref("");
const theme = ref("system");

function getSystemTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
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
  onMounted(() => {
    if (auth.currentUser) {
      displayName.value = auth.currentUser.displayName || "";
      email.value = auth.currentUser.email || "";
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
    saveSettings,
    setTheme,
  };
}