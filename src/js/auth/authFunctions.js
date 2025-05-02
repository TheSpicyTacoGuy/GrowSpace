import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

import { showToast } from "../toast";

const auth = getAuth(); // Get Firebase Authentication

// Authentication functions
async function login() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    showToast("Login successful, welcome!", "success");
  } catch (error) {
    console.error("Authentication error:", error);
    if (error.code === "auth/user-disabled") {
      showToast("User disabled", "danger");
    } else if (error.code === "auth/popup-closed-by-user") {
      showToast("Popup closed by user", "warning");
    } else if (error.code === "auth/popup-blocked") {
      showToast("Popup blocked by browser", "warning");
    } else {
      showToast("Login failed", "danger");
    }
  }
}

async function logout() {
  try {
    await signOut(auth);
    showToast("Logout successful, until next time!", "success");
  } catch (error) {
    console.error("Sign out error:", error);
    showToast("Sign out failed", "danger");
  }
}

//Export the functions
export { login, logout };
