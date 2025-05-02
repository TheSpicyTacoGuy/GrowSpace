// Import Bootstrap CSS
import "../css/bootstrap.min.css";
// Import bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";
// Import custom theme
import "../css/custom-theme.css";

// import Firebase
import "./auth/firebase.js";

//Import Vue Router
import router from "./router";

//load the Vue app
import { createApp } from "vue";
import App from "../App.vue";

createApp(App).use(router).mount("#app");
