import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { showToast } from "./toast"; // Import the toast function
import HomeComponent from "@components/Home.vue";
import NewsComponent from "@components/News.vue";
import NotFound from "@components/NotFound.vue";
import AboutComponent from "@components/About.vue";
import NewsDetailComponent from "@components/NewsDetail.vue";
import DashboardMain from "@components/Authenticated/Dashboard/DashboardMain.vue";
import DashboardComponent from "@components/Authenticated/Dashboard/Dashboard.vue";
import GreenhousesComponent from "@components/Authenticated/Dashboard/Greenhouses.vue";
import GreenhouseDetailComponent from "@components/Authenticated/Dashboard/GreenhouseDetail.vue";
import PlantsComponent from "@components/Authenticated/Dashboard/Plants.vue";
import PlantDetailComponent from "@components/Authenticated/Dashboard/PlantDetail.vue";
import TipsForumComponent from "@components/Authenticated/Dashboard/TipsForum.vue";
import SettingsComponent from "@components/Authenticated/Dashboard/Settings.vue";
import { ref } from "vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
    meta: {
      title: "Home",
      description: "Welcome to the home page of our application.",
    },
  },
  {
    path: "/home",
    name: "home-alt",
    component: HomeComponent,
    meta: {
      title: "Home",
      description: "Welcome to the home page of our application.",
    },
  },
  {
    path: "/news",
    name: "news",
    component: NewsComponent,
    meta: {
      title: "News",
      description: "Stay updated with the latest news.",
    },
  },
  {
    path: "/news/:id",
    name: "news-detail",
    component: NewsDetailComponent,
  },
  {
    path: "/about",
    name: "about",
    component: AboutComponent,
    meta: {
      title: "About",
      description: "Learn more about us.",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard-main",
    component: DashboardMain,
    children: [
      {
        path: "",
        name: "dashboard",
        components: {
          dashboard: DashboardComponent,
        },
        meta: {
          title: "Dashboard",
          description: "Your dashboard overview.",
        },
      },
      {
        path: "greenhouses",
        name: "greenhouses",
        components: {
          dashboard: GreenhousesComponent,
        },
        meta: {
          title: "Greenhouses",
          description: "Manage your greenhouses here.",
        },
      },
      {
        path: "greenhouses/:id",
        name: "greenhouse-detail",
        components: {
          dashboard: GreenhouseDetailComponent,
        },
        meta: {
          title: "Greenhouse Detail",
          description: "View details of a specific greenhouse.",
        },
      },
      {
        path: "plants",
        name: "plants",
        components: {
          dashboard: PlantsComponent,
        },
        meta: {
          title: "Plants",
          description: "Manage your plants here.",
        },
      },
      {
        path: "plants/:id",
        name: "plant-detail",
        components: {
          dashboard: PlantDetailComponent,
        },
        meta: {
          title: "Plant Detail",
          description: "View details of a specific plant.",
        },
      },
      {
        path: "tips",
        name: "tips",
        components: {
          dashboard: TipsForumComponent,
        },
        meta: {
          title: "Tips",
          description: "Share and like plant tips.",
        },
      },
      {
        path: "settings",
        name: "settings",
        components: {
          dashboard: SettingsComponent,
        },
        meta: {
          title: "Settings",
          description: "Manage your account settings.",
        },
      },
      {
        path: "/dashboard/:pathMatch(.*)*",
        name: "dashboard-not-found",
        components: {
          dashboard: NotFound,
        },
        meta: {
          title: "Not Found",
          description: "Page not found.",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/cos30043/s101634222/project/app/"),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash };
    }
  },
});

// --- Add this block to update title and meta description ---
router.afterEach((to) => {
  // Set document title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + " | GrowSpace";
  } else {
    document.title = "GrowSpace";
  }

  // Set meta description
  let description = to.meta && to.meta.description ? to.meta.description : "The best place to grow your plants, and manage your greenhouses.";
  let metaTag = document.querySelector('meta[name="description"]');
  if (metaTag) {
    metaTag.setAttribute("content", description);
  } else {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description");
    metaTag.setAttribute("content", description);
    document.head.appendChild(metaTag);
  }
});
// --- End meta update block ---

// Create a reactive loading state for authentication
const isAuthLoading = ref(false);

// Make it available globally
window.isAuthLoading = isAuthLoading;

router.beforeEach(async (to) => {
  const auth = getAuth();

  // Set loading state to true
  isAuthLoading.value = true;

  // Create a promise that resolves when Firebase auth is initialized
  const getCurrentUser = () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  };

  try {
    // Wait for Firebase auth to initialize
    const user = await getCurrentUser();

    // Dashboard routes require authentication
    if (to.matched[0]?.name === "dashboard-main") {
      // If the user is not authenticated, redirect to the login page
      if (!user) {
        showToast(
          "You must be logged in to access this page.",
          "warning",
          5000
        );
        return { path: "/home" };
      }
    }

    // User is authenticated or route doesn't require auth, allow access
    return true;
  } finally {
    // Always set loading state to false when auth check completes
    isAuthLoading.value = false;
  }
});

export default router;
