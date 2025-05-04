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
    weeklyRainfall: 0,
    uvIndex: 0,
    forecast: [] // Add this for the 7-day forecast
  });

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    // Existing code unchanged...
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
      // Get user's location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 60000
        });
      });
      
      const { latitude, longitude } = position.coords;
      
      // Call Open-Meteo API with hourly and daily data
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` + 
        `&hourly=temperature_2m,relative_humidity_2m,rain,weather_code` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,relative_humidity_2m_max` +
        `&current=temperature_2m,relative_humidity_2m,weather_code` +
        `&timezone=auto`
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
      
      // Calculate weekly rainfall total from daily data
      let weeklyRainfall = 0;
      if (data.daily && Array.isArray(data.daily.precipitation_sum)) {
        weeklyRainfall = data.daily.precipitation_sum
          .slice(0, 7)
          .reduce((sum, val) => sum + (val || 0), 0);
      }
      
      // Process 7-day forecast
      const forecast = [];
      if (data.daily) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        for (let i = 0; i < 7 && i < data.daily.time.length; i++) {
          const date = new Date(data.daily.time[i]);
          const dayName = i === 0 ? 'Today' : days[date.getDay()];
          
          forecast.push({
            day: dayName,
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            condition: getWeatherCondition(data.daily.weather_code[i]),
            tempMax: Math.round(data.daily.temperature_2m_max[i]),
            tempMin: Math.round(data.daily.temperature_2m_min[i]),
            rainfall: Math.round(data.daily.precipitation_sum[i] * 10) / 10,
            humidity: data.daily.relative_humidity_2m_max[i]
          });
        }
      }
      
      // Update weather state with current and forecast data
      weather.loaded = true;
      weather.temperature = Math.round(data.current.temperature_2m);
      weather.condition = getWeatherCondition(data.current.weather_code);
      weather.humidity = data.current.relative_humidity_2m;
      weather.weeklyRainfall = Math.round(weeklyRainfall * 10) / 10; // Round to 1 decimal place
      weather.forecast = forecast;
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