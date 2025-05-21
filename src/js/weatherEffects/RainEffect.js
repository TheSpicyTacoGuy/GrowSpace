/**
 * Rain Effect Generator
 * Creates realistic animated raindrops using DOM elements
 */

export default class RainEffect {
  constructor(container) {
    this.container = container;
    this.interval = null;
    this.isActive = false;
  }

  /**
   * Start generating raindrops
   */
  start() {
    if (this.isActive || !this.container) return;
    this.isActive = true;

    // Clear any existing drops first
    this.stop();

    // Start creating raindrops at intervals
    this.interval = setInterval(() => {
      // Create between 1-3 drops at once for varied density
      const dropCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < dropCount; i++) {
        this.createDrop();
      }
    }, 50); // Create drops every 50ms
  }

  /**
   * Create a single raindrop element
   */
  createDrop() {
    const drop = document.createElement("div");
    drop.className = "raindrop";

    // Random size between 1-3px wide and 7-15px tall
    const width = Math.random() * 2 + 1;
    const height = Math.random() * 8 + 7;

    // Random position across the container width
    const posX = Math.random() * 100;

    // Random speed for more natural effect
    const speed = Math.random() * 0.06 + 0.2;

    // Apply styles
    drop.style.cssText = `
      position: absolute;
      top: -15px;
      left: ${posX}%;
      width: ${width}px;
      height: ${height}px;
      background: rgba(159, 187, 216, 0.6);
      border-radius: 50%;
      opacity: ${Math.random() * 0.5 + 0.5};
      transform: rotate(15deg);
      animation: rainFall ${speed}s linear forwards;
    `;

    // Add drop to container
    this.container.appendChild(drop);

    // Remove drop after animation completes
    setTimeout(
      () => {
        if (drop.parentNode === this.container) {
          this.container.removeChild(drop);
        }
      },
      speed * 1000 + 500
    ); // Animation time plus buffer
  }

  /**
   * Stop the rain effect and clear drops
   */
  stop() {
    this.isActive = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

    // Clear existing raindrops
    if (this.container) {
      const raindrops = this.container.querySelectorAll(".raindrop");
      raindrops.forEach((drop) => {
        this.container.removeChild(drop);
      });
    }
  }

  /**
   * Add required CSS for the rain animation
   */
  static addStyles() {
    // Check if styles already exist
    if (document.getElementById("rain-effect-styles")) return;

    // Create style element
    const styleEl = document.createElement("style");
    styleEl.id = "rain-effect-styles";

    // Add keyframes animation
    styleEl.textContent = `
      @keyframes rainFall {
        0% {
          transform: translateY(0) rotate(15deg);
          opacity: 0.7;
        }
        80% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(1000%) rotate(15deg);
          opacity: 0;
        }
      }
    `;

    // Add to document head
    document.head.appendChild(styleEl);
  }
}
