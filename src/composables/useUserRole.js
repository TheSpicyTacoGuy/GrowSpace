import { ref, onMounted, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { showToast } from "@js/toast";

export function useUserRole() {
  const userRole = ref("user");
  const currentUser = ref(null);
  const authLoading = ref(true);
  const db = getFirestore();
  const auth = getAuth();
  const errorState = ref(false);

  // Add retry mechanism
  const retryCount = ref(0);
  const maxRetries = 3;

  async function fetchUserRole(uid) {
    if (retryCount.value >= maxRetries) {
      console.warn(`Max retries (${maxRetries}) reached for fetching user role.`);
      userRole.value = "user"; // Fallback to basic user role
      authLoading.value = false; // Ensure we unblock the UI
      return;
    }

    try {
      const userDocRef = doc(db, "userData", uid);
      
      // Use a try-catch specifically for getDoc to isolate permission issues
      try {
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          userRole.value = userDoc.data().role || "user";
          errorState.value = false;
        } else {
          // Create the user document if it doesn't exist
          try {
            await setDoc(userDocRef, {
              role: "user",
              createdAt: new Date(),
            });
            userRole.value = "user";
            errorState.value = false;
          } catch (createErr) {
            console.error("Failed to create user document:", createErr);
            errorState.value = true;
            userRole.value = "user"; // Fallback
          }
        }
      } catch (docError) {
        // Specific handling for document access errors
        console.error("Error accessing document:", docError);
        
        // For permission errors, log details and proceed with default role
        if (docError.code === 'permission-denied') {
          console.warn("Permission denied when accessing user role. Using default role.");
          userRole.value = "user"; // Use default role
          errorState.value = true;
          
          // Only retry a few times for permission errors to avoid spamming
          if (retryCount.value < 1) {
            retryCount.value++;
            setTimeout(() => fetchUserRole(uid), 2000); // Wait longer between retries
          } else {
            // If permissions still fail, just continue with default role
            authLoading.value = false;
            showToast("Limited access mode: some features may be restricted", "warning");
          }
          return;
        }
        
        // For other errors, use the regular retry mechanism
        throw docError;
      }
    } catch (e) {
      console.error("Error in fetchUserRole:", e);
      errorState.value = true;
      
      // Increment retry count and try again after delay
      retryCount.value++;
      if (retryCount.value < maxRetries) {
        setTimeout(() => fetchUserRole(uid), 1000); // Retry after 1 second
      } else {
        showToast("Using limited access mode", "warning");
        userRole.value = "user"; // Fallback to user role
        authLoading.value = false; // Unblock UI
      }
    }
  }

  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      currentUser.value = user;
      retryCount.value = 0; // Reset retry count

      if (user) {
        try {
          await fetchUserRole(user.uid);
        } catch (err) {
          console.error("Uncaught error in auth state change handler:", err);
          userRole.value = "user"; // Fallback
        } finally {
          // Always set loading to false, even if there are errors
          authLoading.value = false;
        }
      } else {
        userRole.value = "user";
        authLoading.value = false;
      }
    });

    // Fallback timeout in case auth state never resolves
    const timeout = setTimeout(() => {
      if (authLoading.value) {
        console.warn("Auth state loading timeout reached");
        authLoading.value = false;
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  });

  // Add isAdmin computed property for convenience
  const isAdmin = computed(() => userRole.value === "admin");

  return { userRole, currentUser, authLoading, errorState, isAdmin };
}