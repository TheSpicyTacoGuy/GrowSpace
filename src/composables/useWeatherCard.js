import { ref, onMounted, watch, computed, onBeforeUnmount } from "vue";
import RainEffect from "@js/weatherEffects/RainEffect.js";
import SnowEffect from "@js/weatherEffects/SnowEffect.js";

export default function useWeatherCard(props) {
  // Scrollable forecast logic
  const scrollPosition = ref(0);
  const canScrollLeft = ref(false);
  const canScrollRight = ref(true);

  // Weather effects logic
  const rainEffect = ref(null);
  const snowEffect = ref(null);
  const effectContainerRef = ref(null);

  // Computed property to determine the weather effect class
  const weatherEffectClass = computed(() => {
    if (!props.weather.loaded || !props.weather.condition)
      return "weather-effect-default";

    const condition = props.weather.condition.toLowerCase();

    const weatherTypes = [
      { keywords: ["thunder", "lightning", "storm"], effect: "weather-effect-thunder" },
      { keywords: ["rain", "drizzle", "shower"], effect: "weather-effect-rain" },
      { keywords: ["snow", "sleet", "blizzard"], effect: "weather-effect-snow" },
      { keywords: ["fog", "mist", "frost"], effect: "weather-effect-fog" },
      { keywords: ["clear", "sunny", "partly cloudy"], effect: "weather-effect-sunny" },
      { keywords: ["cloud", "overcast", "partly cloudy"], effect: "weather-effect-cloudy" },
    ];

    for (const type of weatherTypes) {
      if (type.keywords.some((keyword) => condition.includes(keyword))) {
        return type.effect;
      }
    }
    return "weather-effect-default";
  });

  const updateScrollIndicators = () => {
    const container = document.querySelector(".forecast-scroll-container");
    if (!container) return;
    scrollPosition.value = container.scrollLeft;
    canScrollLeft.value = container.scrollLeft > 0;
    const hasMoreContent =
      container.scrollWidth > container.clientWidth + container.scrollLeft + 75;
    canScrollRight.value = hasMoreContent;
  };

  const scrollForecast = (direction) => {
    const forecastContainer = document.querySelector(".forecast-scroll-container");
    const scrollAmount = direction === "left" ? -120 : 120;
    forecastContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    updateScrollIndicators();
  };

  // Weather effect initializers
  const initializeRainEffect = () => {
    if (!effectContainerRef.value || rainEffect.value) return;
    try {
      RainEffect.addStyles();
      rainEffect.value = new RainEffect(effectContainerRef.value);
      if (props.weather.loaded && weatherEffectClass.value === "weather-effect-rain") {
        rainEffect.value.start();
      }
    } catch (error) {
      console.error("Failed to initialize rain effect:", error);
    }
  };

  const initializeSnowEffect = () => {
    if (!effectContainerRef.value || snowEffect.value) return;
    try {
      SnowEffect.addStyles();
      snowEffect.value = new SnowEffect(effectContainerRef.value);
      if (props.weather.loaded && weatherEffectClass.value === "weather-effect-snow") {
        snowEffect.value.start();
      }
    } catch (error) {
      console.error("Failed to initialize snow effect:", error);
    }
  };

  // Watchers
  watch(weatherEffectClass, (newClass) => {
    if (!rainEffect.value && effectContainerRef.value) initializeRainEffect();
    if (!snowEffect.value && effectContainerRef.value) initializeSnowEffect();

    if (rainEffect.value) {
      if (newClass === "weather-effect-rain") rainEffect.value.start();
      else rainEffect.value.stop();
    }
    if (snowEffect.value) {
      if (newClass === "weather-effect-snow") snowEffect.value.start();
      else snowEffect.value.stop();
    }
  });

  watch(effectContainerRef, (container) => {
    if (container) {
      if (!rainEffect.value) initializeRainEffect();
      if (!snowEffect.value) initializeSnowEffect();
    }
  });

  watch(
    () => props.weather.loaded,
    (isLoaded) => {
      if (isLoaded) {
        setTimeout(() => {
          updateScrollIndicators();
          if (!rainEffect.value && effectContainerRef.value) initializeRainEffect();
          if (!snowEffect.value && effectContainerRef.value) initializeSnowEffect();
        }, 100);
      }
    }
  );

  onBeforeUnmount(() => {
    if (rainEffect.value) rainEffect.value.stop();
    if (snowEffect.value) snowEffect.value.stop();
  });

  onMounted(() => {
    const container = document.querySelector(".forecast-scroll-container");
    if (container) {
      container.addEventListener("scroll", updateScrollIndicators);
      setTimeout(updateScrollIndicators, 100);
      setTimeout(updateScrollIndicators, 500);
    }
    effectContainerRef.value = document.querySelector(".weather-effect-container");
    setTimeout(() => {
      initializeRainEffect();
      initializeSnowEffect();
    }, 50);
  });

  return {
    scrollPosition,
    canScrollLeft,
    canScrollRight,
    effectContainerRef,
    weatherEffectClass,
    updateScrollIndicators,
    scrollForecast,
  };
}