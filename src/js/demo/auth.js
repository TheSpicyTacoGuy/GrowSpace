/**
 * In-memory stand-in for the Firebase Auth SDK, used in demo mode.
 *
 * A demo account is always signed in so authenticated routes stay reachable
 * while the app runs without credentials.
 */
import { DEMO_USER } from "./mockData.js";

const demoUser = { ...DEMO_USER };

const auth = {
  type: "auth",
  name: "GrowSpace demo",
  currentUser: demoUser,
  onAuthStateChanged(callback) {
    return subscribe(callback);
  },
};

function credentials() {
  return { user: auth.currentUser };
}

function subscribe(callback) {
  const handle = setTimeout(() => callback(auth.currentUser), 0);
  return () => clearTimeout(handle);
}

export function getAuth() {
  return auth;
}

export function onAuthStateChanged(_auth, callback) {
  return subscribe(callback);
}

export async function signInWithEmailAndPassword(_auth, email) {
  auth.currentUser = { ...demoUser, email: email || demoUser.email };
  return credentials();
}

export async function signInWithPopup() {
  return credentials();
}

export async function signOut() {
  // Demo mode keeps the sample account signed in so the dashboard, and the
  // screenshots taken from it, stay reachable.
}

export async function updateProfile(user, profile) {
  Object.assign(user, profile);
  Object.assign(auth.currentUser, profile);
}

export async function deleteUser() {
  // Nothing to delete against an in-memory store.
}

export class GoogleAuthProvider {}

export class FacebookAuthProvider {}
