import { ref, reactive, shallowRef } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { showToast } from "/js/toast";
import { useSettings } from "./useSettings";

// Weather code mapping - moved outside function to avoid recreation
const WEATHER_CODE_MAP = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 
  53: "Moderate drizzle", 55: "Dense drizzle", 56: "Light freezing drizzle",
  57: "Dense freezing drizzle", 61: "Slight rain", 63: "Moderate rain",
  65: "Heavy rain", 66: "Light freezing rain", 67: "Heavy freezing rain",
  71: "Slight snow fall", 73: "Moderate snow fall", 75: "Heavy snow fall",
  77: "Snow grains", 80: "Slight rain showers", 81: "Moderate rain showers",
  82: "Violent rain showers", 85: "Slight snow showers", 86: "Heavy snow showers",
  95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
};

// Default Melbourne coordinates - avoid recreating each time
const DEFAULT_LOCATION = { latitude: -37.8136, longitude: 144.9631 };

// Weather cache constants
const WEATHER_CACHE_KEY = "weatherDataCache";
const WEATHER_CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds
const LOCATION_CACHE_KEY = "lastSuccessfulLocation";
const LOCATION_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useDashboard() {
  const db = getFirestore();
  const auth = getAuth();

  // State
  const loading = ref(true);
  const error = ref(null);
  const weatherError = ref(null);
  const greenhouseCount = ref(0);
  const plantCount = ref(0);
  
  // Use shallowRef for forecast to improve performance with large arrays
  const forecastData = shallowRef([]);
  
  const weather = reactive({
    loaded: false,
    temperature: 0,
    condition: "",
    humidity: 0,
    updatedAt: "",
    todayRainfall: 0,
    uvIndex: 0,
    get forecast() { return forecastData.value; },
    isManualLocation: false,
    usingFallback: false,
    locationName: ""
  });

  const { weatherLocation } = useSettings();

  const fetchDashboardStats = async () => {
    if (loading.value === false) return { greenhouseCount: greenhouseCount.value, plantCount: plantCount.value };
    
    loading.value = true;
    error.value = null;

    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to view dashboard");
      }

      const userId = auth.currentUser.uid;
      const [greenhousesSnapshot, plantsSnapshot] = await Promise.all([
        getDocs(collection(db, `userData/${userId}/greenhouses`)),
        getDocs(collection(db, `userData/${userId}/plants`))
      ]);
      
      greenhouseCount.value = greenhousesSnapshot.size;
      plantCount.value = plantsSnapshot.size;

      return { greenhouseCount: greenhouseCount.value, plantCount: plantCount.value };
    } catch (err) {
      console.error("Error fetching dashboard stats: ", err);
      error.value = "Unable to load dashboard statistics. Please try again later.";
      showToast("Unable to load dashboard statistics", "error");
      return { greenhouseCount: 0, plantCount: 0 };
    } finally {
      loading.value = false;
    }
  };

  // Helper for getting weather condition text
  const getWeatherCondition = (code) => WEATHER_CODE_MAP[code] || "Unknown";
  
  // Helper for caching
  const cacheData = (key, data, ttl = 0) => {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now(),
      ttl
    }));
  };
  
  // Helper for retrieving cached data
  const getCachedData = (key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const { data, timestamp, ttl } = JSON.parse(cached);
      if (ttl && Date.now() - timestamp > ttl) return null;
      
      return data;
    } catch (e) {
      console.warn(`Error reading cache (${key}):`, e);
      return null;
    }
  };

  // Fetch weather data from Open-Meteo API
  const fetchWeatherData = async () => {
    weather.loaded = false;
    weatherError.value = null;

    // Try to use cached weather data first
    const cachedWeather = getCachedData(WEATHER_CACHE_KEY);
    if (cachedWeather) {
      // Update reactive state from cache
      weather.loaded = true;
      weather.temperature = cachedWeather.temperature;
      weather.condition = cachedWeather.condition;
      weather.humidity = cachedWeather.humidity;
      weather.todayRainfall = cachedWeather.todayRainfall;
      weather.updatedAt = cachedWeather.updatedAt;
      weather.isManualLocation = cachedWeather.isManualLocation;
      weather.usingFallback = cachedWeather.usingFallback;
      weather.locationName = cachedWeather.locationName;
      forecastData.value = cachedWeather.forecast;
      
      // Fetch fresh data in background
      setTimeout(() => refreshWeatherData(), 0);
      return;
    }
    
    // If no cache, fetch fresh data
    await refreshWeatherData();
  };
  
  // Helper function to fetch fresh weather data
  const refreshWeatherData = async () => {
    let latitude, longitude, usingFallbackLocation = false;

    try {
      // Use manual location if set and valid
      if (
        weatherLocation.value.type === "manual" &&
        weatherLocation.value.coords?.lat &&
        weatherLocation.value.coords?.lon
      ) {
        latitude = weatherLocation.value.coords.lat;
        longitude = weatherLocation.value.coords.lon;
      } else if (weatherLocation.value.type === "manual") {
        weatherError.value = "No weather location set. Please go to Settings to add a location.";
        showToast(weatherError.value, "warning");
        return;
      } else {
        // Try to get location - optimized flow
        const locationResult = await getLocation();
        latitude = locationResult.latitude;
        longitude = locationResult.longitude;
        usingFallbackLocation = locationResult.usingFallback;
        
        if (locationResult.condition) {
          weather.condition = locationResult.condition;
        }
      }

      // Call Open-Meteo API with only required parameters
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
      
      // Process forecast data efficiently
      const forecast = processWeatherForecast(data);
      forecastData.value = forecast;

      // Update weather state with current data
      weather.loaded = true;
      weather.temperature = Math.round(data.current.temperature_2m);
      weather.condition = getWeatherCondition(data.current.weather_code);
      weather.humidity = data.current.relative_humidity_2m;
      weather.todayRainfall = data.daily?.precipitation_sum?.[0] ? 
        Math.round(data.daily.precipitation_sum[0] * 10) / 10 : 0;
      weather.updatedAt = new Date().toLocaleTimeString();

      // Set location info
      updateLocationInfo(usingFallbackLocation);
      
      // Cache the weather data
      cacheData(WEATHER_CACHE_KEY, {
        temperature: weather.temperature,
        condition: weather.condition,
        humidity: weather.humidity,
        todayRainfall: weather.todayRainfall,
        updatedAt: weather.updatedAt,
        forecast,
        isManualLocation: weather.isManualLocation,
        usingFallback: weather.usingFallback,
        locationName: weather.locationName
      }, WEATHER_CACHE_EXPIRY);
      
    } catch (err) {
      console.error("Error fetching weather data: ", err);
      if (!weatherError.value) {
        weatherError.value = "Unable to load weather data. Please try again later.";
        showToast(weatherError.value, "error");
      }
    }
  };
  
  // Optimized location fetching
  const getLocation = async () => {
    // First check for cached location
    const cachedLocation = getCachedData(LOCATION_CACHE_KEY);
    if (cachedLocation) {
      // Asynchronously refresh the location in background
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            cacheData(LOCATION_CACHE_KEY, {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }, LOCATION_CACHE_EXPIRY);
          },
          () => {}, // Silent error handler
          { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
        );
      }, 0);
      
      return { 
        latitude: cachedLocation.latitude, 
        longitude: cachedLocation.longitude,
        usingFallback: false,
        condition: "Using saved location" 
      };
    }
    
    // No cached location, try to get current position
    try {
      const position = await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          weather.condition = "Location request in progress...";
        }, 2000);
        
        navigator.geolocation.getCurrentPosition(
          position => {
            clearTimeout(timeoutId);
            resolve(position);
            
            // Cache successful location
            cacheData(LOCATION_CACHE_KEY, {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }, LOCATION_CACHE_EXPIRY);
          },
          err => {
            clearTimeout(timeoutId);
            reject(new Error(getLocationErrorMessage(err)));
          },
          { timeout: 15000, maximumAge: 60000, enableHighAccuracy: false }
        );
      });
      
      return { 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
        usingFallback: false 
      };
    } catch (err) {
      console.warn("Geolocation error:", err.message);
      weatherError.value = err.message;
      showToast(weatherError.value, "warning");
      
      return { 
        ...DEFAULT_LOCATION, 
        usingFallback: true,
        condition: "Using approximate location" 
      };
    }
  };
  
  // Helper for location error messages
  const getLocationErrorMessage = (err) => {
    if (err.code === 1) return "Location permission denied. Please set a manual location in Settings.";
    if (err.code === 2) return "Your location is unavailable. Please set a manual location in Settings.";
    if (err.code === 3) return "Location request timed out. Please set a manual location in Settings.";
    return "Unable to get your location. Please set a manual location in Settings.";
  };
  
  // Process forecast data efficiently
  const processWeatherForecast = (data) => {
    if (!data.daily?.time || !data.daily?.weather_code) return [];
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const forecast = [];
    
    const dailyData = data.daily;
    const maxLen = Math.min(7, dailyData.time.length);
    
    for (let i = 0; i < maxLen; i++) {
      const date = new Date(dailyData.time[i]);
      forecast.push({
        day: i === 0 ? 'Today' : days[date.getDay()],
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        condition: getWeatherCondition(dailyData.weather_code[i]),
        tempMax: Math.round(dailyData.temperature_2m_max?.[i] || 0),
        tempMin: Math.round(dailyData.temperature_2m_min?.[i] || 0),
        rainfall: dailyData.precipitation_sum?.[i] ? 
          Math.round(dailyData.precipitation_sum[i] * 10) / 10 : 0,
        humidity: dailyData.relative_humidity_2m_max?.[i] || 0
      });
    }
    
    return forecast;
  };
  
  // Update location information
  const updateLocationInfo = (usingFallbackLocation) => {
    if (weatherLocation.value.type === "manual") {
      weather.isManualLocation = true;
      
      if (weatherLocation.value.manual && typeof weatherLocation.value.manual === 'string') {
        weather.locationName = weatherLocation.value.manual;
      } 
      else if (weatherLocation.value.coords && weatherLocation.value.coords.name) {
        const locationName = weatherLocation.value.coords.name;
        const country = weatherLocation.value.coords.country;
        weather.locationName = country ? `${locationName}, ${country}` : locationName;
      } 
      else {
        weather.locationName = "Custom location";
      }
    } else if (usingFallbackLocation) {
      weather.usingFallback = true;
      weather.locationName = "Melbourne"; 
    } else {
      weather.isManualLocation = false;
      weather.usingFallback = false;
      weather.locationName = "Current location";
    }
  };

  return {
    loading,
    error,
    weatherError,
    greenhouseCount,
    plantCount,
    weather,
    fetchDashboardStats,
    fetchWeatherData
  };
}