/**
 * True when no Firebase project is configured, which switches the app to the
 * in-memory demo backend in src/js/demo. Kept dependency-free so it can be
 * imported anywhere without pulling in the Firebase SDK.
 */
export const isDemoMode =
  !import.meta.env.VITE_FIREBASE_API_KEY ||
  !import.meta.env.VITE_FIREBASE_PROJECT_ID;
