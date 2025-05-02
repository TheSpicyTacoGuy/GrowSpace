import { ref, reactive } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "/js/toast";

export function useDashboard() {
  const db = getFirestore();
  const auth = getAuth();

  // State
  const loading = ref(true);
  const error = ref(null);
  const greenhouseCount = ref(0);
  const plantCount = ref(0);
  const weather = reactive({
    loaded: false,
    temperature: 0,
    condition: "",
    humidity: 0,
    updatedAt: "",
  });

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Make sure user is authenticated
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view dashboard");
      }

      const userId = auth.currentUser.uid;

      // Get greenhouse count
      const greenhousesRef = collection(db, `userData/${userId}/greenhouses`);
      const greenhousesSnapshot = await getDocs(greenhousesRef);
      greenhouseCount.value = greenhousesSnapshot.size;

      // Get plant count
      const plantsRef = collection(db, `userData/${userId}/plants`);
      const plantsSnapshot = await getDocs(plantsRef);
      plantCount.value = plantsSnapshot.size;

      return { greenhouseCount: greenhouseCount.value, plantCount: plantCount.value };
    } catch (err) {
      console.error("Error fetching dashboard stats: ", err);
      error.value = "Unable to load dashboard statistics. Please try again later.";
      showToast("Unable to load dashboard statistics. Please try again later.", "error");
      return { greenhouseCount: 0, plantCount: 0 };
    } finally {
      loading.value = false;
    }
  };

// Fetch weather data from Open-Meteo API
const fetchWeatherData = async () => {
    weather.loaded = false;
    
    try {
        // Get user's location (you may want to store this in user preferences instead)
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                maximumAge: 60000
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // Call Open-Meteo API
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Map weather code to condition text
        const getWeatherCondition = (code) => {
            // Simplified mapping based on WMO codes
            if (code <= 1) return "Clear";
            if (code <= 3) return "Partly Cloudy";
            if (code <= 9) return "Foggy";
            if (code <= 19) return "Drizzle";
            if (code <= 29) return "Rainy";
            if (code <= 39) return "Snowy";
            return "Stormy";
        };
        
        // Update weather state with real data
        weather.loaded = true;
        weather.temperature = Math.round(data.current.temperature_2m);
        weather.condition = getWeatherCondition(data.current.weather_code);
        weather.humidity = data.current.relative_humidity_2m;
        weather.updatedAt = new Date().toLocaleTimeString();
    } catch (err) {
        console.error("Error fetching weather data: ", err);
        showToast("Unable to load weather data. Please try again later.", "error");
    }
};

  return {
    // State
    loading,
    error,
    greenhouseCount,
    plantCount,
    weather,
    
    // Methods
    fetchDashboardStats,
    fetchWeatherData
  };
}