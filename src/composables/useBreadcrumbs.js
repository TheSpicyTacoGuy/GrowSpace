import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { db, auth } from "@js/auth/firebase.js";
import { doc, getDoc } from "firebase/firestore";

export function useBreadcrumbs() {
  const router = useRouter();
  const dynamicNames = ref({});

  // Fetch dynamic entity names for detail pages
  async function fetchDynamicName(type, id, userId) {
    const resolvedUserId = userId || auth.currentUser?.uid;
    if (!id || !resolvedUserId || dynamicNames.value[`${type}-${id}`]) return;
    let name = "";
    try {
      if (type === "plant") {
        const docRef = doc(db, `userData/${resolvedUserId}/plants`, id);
        const snap = await getDoc(docRef);
        if (snap.exists()) name = snap.data().name;
      } else if (type === "greenhouse") {
        const docRef = doc(db, `userData/${resolvedUserId}/greenhouses`, id);
        const snap = await getDoc(docRef);
        if (snap.exists()) name = snap.data().name;
      }
      if (name) dynamicNames.value[`${type}-${id}`] = name;
    } catch (e) {
      console.error(`Error fetching ${type} name:`, e);
    }
  }

  // Watch for route changes and fetch names if needed
  watch(
    () => router.currentRoute.value,
    (to) => {
      const { name, params } = to;
      const userId = params.userId || auth.currentUser?.uid;
      if (name === "plant-detail" && params.id) fetchDynamicName("plant", params.id, userId);
      if (name === "greenhouse-detail" && params.id) fetchDynamicName("greenhouse", params.id, userId);
    },
    { immediate: true }
  );

  const matchedRoutes = computed(() => router.currentRoute.value.matched);

  const breadcrumbLabels = computed(() => {
    const labels = [];
    matchedRoutes.value.forEach((matched) => {
      // Skip dashboard-main in the label, but keep for hierarchy
      if (matched.name === "dashboard-main") return;
      if (matched.path === "/dashboard" || matched.name === "dashboard") {
        labels.push("Dashboard");
      } else if (
        matched.name === "plant-detail" &&
        router.currentRoute.value.params.id
      ) {
        labels.push(
          dynamicNames.value[`plant-${router.currentRoute.value.params.id}`] ||
          matched.meta?.title ||
          matched.name
        );
      } else if (
        matched.name === "greenhouse-detail" &&
        router.currentRoute.value.params.id
      ) {
        labels.push(
          dynamicNames.value[`greenhouse-${router.currentRoute.value.params.id}`] ||
          matched.meta?.title ||
          matched.name
        );
      } else {
        labels.push(matched.meta?.title || matched.name);
      }
    });
    return labels;
  });

  return {
    matchedRoutes,
    breadcrumbLabels,
    router,
  };
}