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
import { Tooltip } from "bootstrap";

//Inintialise Tooltips
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
  );

  const app = createApp(App);

  app.directive("tooltip", {
    mounted(el) {
        new Tooltip(el);
    },
    unmounted(el) {
        const tooltip = Tooltip.getInstance(el);
        if (tooltip) {
            tooltip.dispose();
        }
    },
  });

app.use(router).mount("#app");
