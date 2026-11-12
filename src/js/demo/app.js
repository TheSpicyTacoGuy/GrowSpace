/**
 * Stub for `firebase/app` in demo mode. The demo backend has no app to
 * initialise, so this only keeps the bootstrap call in `js/auth/firebase.js`
 * valid.
 */
export function initializeApp() {
  return { name: "[DEFAULT]" };
}

export function getApp() {
  return { name: "[DEFAULT]" };
}
