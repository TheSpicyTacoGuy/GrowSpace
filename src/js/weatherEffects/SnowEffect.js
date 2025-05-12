/**
 * Snow Effect Generator
 * Creates realistic animated snowflakes using DOM elements
 */

export default class SnowEffect {
  constructor(container) {
    this.container = container;
    this.interval = null;
    this.isActive = false;
  }

  /**
   * Start generating snowflakes
   */
  start() {
    if (this.isActive || !this.container) return;
    this.isActive = true;

    // Clear any existing flakes first
    this.stop();

    // Start creating snowflakes at intervals
    this.interval = setInterval(() => {
      // Create between 1-3 flakes at once for varied density
      const flakeCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < flakeCount; i++) {
        this.createFlake();
      }
    }, 50); // Create flakes every 50ms
  }

  /**
   * Create a single snowflake element
   */
  createFlake() {
    const flake = document.createElement("div");
    flake.className = "snowflake";

    // Random size for snowflakes (generally round)
    const size = Math.random() * 4 + 2;

    // Random position across the container width
    const posX = Math.random() * 100;

    // Slower speed for snow compared to rain
    const speed = Math.random() * 3 + 4;

    // Apply styles
    flake.style.cssText = `
      position: absolute;
      top: -15px;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation: snowFall ${speed}s linear forwards;
    `;

    // Add flake to container
    this.container.appendChild(flake);

    // Remove flake after animation completes
    setTimeout(
      () => {
        if (flake.parentNode === this.container) {
          this.container.removeChild(flake);
        }
      },
      speed * 1000 + 10000
    ); // Animation time plus buffer
  }

  /**
   * Stop the snow effect and clear flakes
   */
  stop() {
    this.isActive = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    // Clear existing snowflakes
    if (this.container) {
      const snowflakes = this.container.querySelectorAll(".snowflake");
      snowflakes.forEach((flake) => {
        this.container.removeChild(flake);
      });
    }
  }

  /**
   * Add required CSS for the snow animation
   */
  static addStyles() {
    // Check if styles already exist
    if (document.getElementById("snow-effect-styles")) return;

    // Create style element
    const styleEl = document.createElement("style");
    styleEl.id = "snow-effect-styles";

    // Add keyframes animation with swaying motion
    styleEl.textContent = `
      @keyframes snowFall {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0.8;
        }
        25% {
          transform: translateY(250%) translateX(10px);
        }
        50% {
          transform: translateY(500%) translateX(-10px);
        }
        75% {
          transform: translateY(750%) translateX(10px);
        }
        100% {
          transform: translateY(1000%) translateX(-10px);
          opacity: 0;
        }
      }
    `;

    // Add to document head
    document.head.appendChild(styleEl);
  }
}
