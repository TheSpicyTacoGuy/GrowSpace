// This is the Vite configuration file. It is used to configure the Vite development server and build process.
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import terser from "@rollup/plugin-terser";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: "/cos30043/s101634222/project/app/",
  plugins: [
    vue(),
    ViteImageOptimizer({
      // Test pattern for images
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      // Optimizer configs
      jpg: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      png: {
        quality: 80,
        compressionLevel: 8,
      },
      webp: {
        quality: 80,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
      gif: {
        optimizationLevel: 7,
      },
      includePublic: true,
      logStats: true,
    }),
  ],
  root: path.resolve(__dirname, "src"),
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@composables": path.resolve(__dirname, "src/composables"),
      "@js": path.resolve(__dirname, "src/js"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "app"),
    assetsDir: "assets",
    publicDir: path.resolve(__dirname, "public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 800,
    minify: "terser",
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true,
        // Pure functions that can be safely removed
        pure_funcs: ["console.log", "console.debug", "console.info"],
        // Passes for optimization
        passes: 2,
      },
      format: {
        // Remove comments
        comments: false,
      },
      mangle: {
        // Aggressive variable name mangling
        toplevel: true,
      },
    },
    rollupOptions: {
      plugins: [terser()],
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"],
          bootstrap: ["bootstrap"],
          "firebase-app": ["firebase/app"],
          "firebase-auth": ["firebase/auth"],
          "firebase-firestore": ["firebase/firestore"],
          "firebase-storage": ["firebase/storage"],
          components: [
            "./src/components/Authenticated/Dashboard/PlantComponents/PlantCard.vue",
            "./src/components/Authenticated/Dashboard/GreenhouseDetail.vue",
            "./src/components/Authenticated/Dashboard/DashboardComponents/WeatherCard.vue",
          ],
        },
      },
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  publicDir: path.resolve(__dirname, "public"),
});
