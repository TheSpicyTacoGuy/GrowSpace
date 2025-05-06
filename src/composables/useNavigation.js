import { useRouter } from "vue-router";

export function useNavigation() {
  const router = useRouter();

  // Check if a route or its child is active
  const checkActiveRoute = (routeName) => {
    const currentRouteName = router.currentRoute.value.name;
    const currentPath = router.currentRoute.value.path;

    // Exact match
    if (currentRouteName === routeName) {
      return true;
    }

    // Check for parent-child relationships
    if (
      routeName === "greenhouses" &&
      (currentRouteName === "greenhouse-detail" ||
        currentPath.includes("/greenhouses/"))
    ) {
      return true;
    }

    if (
      routeName === "plants" &&
      (currentRouteName === "plant-detail" || currentPath.includes("/plants/"))
    ) {
      return true;
    }

    return false;
  };

  // Return "active" class if route is active
  const isActive = (routeName) => {
    return checkActiveRoute(routeName) ? "active" : "";
  };

  // Get friendly name for route
  const getPageDisplayName = (routeName) => {
    const pageNames = {
      dashboard: "Dashboard",
      greenhouses: "Greenhouses",
      "greenhouse-detail": "Greenhouses / Greenhouse Detail",
      plants: "Plants",
      "plant-detail": "Plants / Plant Detail",
      settings: "Settings",
    };
    return pageNames[routeName] || routeName;
  };

  // Navigate to route
  const navigateTo = (routeName) => {
    if (routeName === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${routeName}`);
    }
  };

  return {
    checkActiveRoute,
    isActive,
    getPageDisplayName,
    navigateTo
  };
}