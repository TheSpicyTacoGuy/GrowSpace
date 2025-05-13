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
    todayRainfall: 0, // Only today's rainfall
    uvIndex: 0,
    forecast: []
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
        // Mapping based on Open-Meteo/WMO weather codes
        // See: https://open-meteo.com/en/docs#api_form
        const codeMap = {
          0: "Clear sky",
          1: "Mainly clear",
          2: "Partly cloudy",
          3: "Overcast",
          45: "Fog",
          48: "Depositing rime fog",
          51: "Light drizzle",
          53: "Moderate drizzle",
          55: "Dense drizzle",
          56: "Light freezing drizzle",
          57: "Dense freezing drizzle",
          61: "Slight rain",
          63: "Moderate rain",
          65: "Heavy rain",
          66: "Light freezing rain",
          67: "Heavy freezing rain",
          71: "Slight snow fall",
          73: "Moderate snow fall",
          75: "Heavy snow fall",
          77: "Snow grains",
          80: "Slight rain showers",
          81: "Moderate rain showers",
          82: "Violent rain showers",
          85: "Slight snow showers",
          86: "Heavy snow showers",
          95: "Thunderstorm",
          96: "Thunderstorm with slight hail",
          99: "Thunderstorm with heavy hail"
        };
        return codeMap[code] || "Unknown";
      };
      
      const precipitationArr = (data.daily && Array.isArray(data.daily.precipitation_sum))
        ? data.daily.precipitation_sum
        : [];

      // Only today's rainfall
      const todayRainfall = precipitationArr.length > 0 ? Math.round(precipitationArr[0] * 10) / 10 : 0;
      
      // Process 7-day forecast
      const forecast = [];
      if (
        data.daily &&
        Array.isArray(data.daily.time) &&
        Array.isArray(data.daily.weather_code) &&
        Array.isArray(data.daily.temperature_2m_max) &&
        Array.isArray(data.daily.temperature_2m_min) &&
        Array.isArray(data.daily.relative_humidity_2m_max)
      ) {
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
            rainfall: precipitationArr[i] !== undefined ? Math.round(precipitationArr[i] * 10) / 10 : 0,
            humidity: data.daily.relative_humidity_2m_max[i]
          });
        }
      }
      
      // Update weather state with current and forecast data
      weather.loaded = true;
      weather.temperature = Math.round(data.current.temperature_2m);
      weather.condition = getWeatherCondition(data.current.weather_code);
      weather.humidity = data.current.relative_humidity_2m;
      weather.todayRainfall = todayRainfall; // <-- Only today's rainfall
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