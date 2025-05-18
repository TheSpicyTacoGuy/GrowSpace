import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { showToast } from "../toast";
import router from "../router";

const auth = getAuth();
const db = getFirestore();

// Authentication functions
async function login() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user doc exists, if not, create with role "user"
    const userRef = doc(db, "userData", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || "",
        email: user.email || "",
        role: "user", // Default role
        createdAt: new Date(),
      });
    }

    // Redirect to Dashboard
    router.push("/dashboard");
    showToast("Login successful, welcome back!", "success");
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

// Facebook login function
async function loginWithFacebook() {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user doc exists, if not, create with role "user"
    const userRef = doc(db, "userData", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName || "",
        email: user.email || "",
        role: "user", // Default role
        createdAt: new Date(),
      });
    }

    // Redirect to Dashboard
    router.push("/dashboard");
    showToast("Login successful, welcome back!", "success");
  } catch (error) {
    console.error("Facebook Authentication error:", error);
    if (error.code === "auth/user-disabled") {
      showToast("User disabled", "danger");
    } else if (error.code === "auth/popup-closed-by-user") {
      showToast("Popup closed by user", "warning");
    } else if (error.code === "auth/popup-blocked") {
      showToast("Popup blocked by browser", "warning");
    } else {
      showToast("Facebook login failed", "danger");
    }
  }
}

async function logout() {
  try {
    await signOut(auth);
    router.push("/home");
    showToast("Logout successful, until next time!", "success");
  } catch (error) {
    console.error("Sign out error:", error);
    showToast("Sign out failed", "danger");
  }
}

async function fetchUserRole(uid) {
  try {
    // Changed from "users" to "userData" for consistency
    const userDoc = await getDoc(doc(db, "userData", uid));
    if (userDoc.exists()) {
      return userDoc.data().role || "user";
    } else {
      // Create the user document if it doesn't exist
      try {
        await setDoc(doc(db, "userData", uid), {
          role: "user",
          createdAt: new Date(),
        });
      } catch (createErr) {
        console.warn("Could not create user document:", createErr.message);
      }
      return "user";
    }
  } catch (e) {
    console.warn("Could not fetch user role:", e.message);
    return "user";
  }
}

//Export the functions
export { login, loginWithFacebook, logout, fetchUserRole };
