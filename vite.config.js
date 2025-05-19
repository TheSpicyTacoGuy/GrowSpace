// This is the Vite configuration file. It is used to configure the Vite development server and build process.
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//import vueDevTools from 'vite-plugin-vue-devtools'

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: "/cos30043/s101634222/project/app/",
  plugins: [vue(),],
  root: path.resolve(__dirname, "src"),
  resolve: {
    alias: {
      // Alias the Bootstrap JS to the node_modules directory
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      // Alias for assets
      "@assets": path.resolve(__dirname, "src/assets"),
      // Alias for components
      "@components": path.resolve(__dirname, "src/components"),
      // Alias for composables
      "@composables": path.resolve(__dirname, "src/composables"),
      //Alias for js
      "@js": path.resolve(__dirname, "src/js"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "app"),
    assetsDir: "assets",
    publicDir: path.resolve(__dirname, "public"),
    emptyOutDir: true,
    // Increase the warning limit to 800kB
    chunkSizeWarningLimit: 800,
    
    // Use Rollup's built-in manual chunking for better control
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'bootstrap': ['bootstrap'],
          'firebase-app': ['firebase/app'],
          'firebase-auth': ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'firebase-storage': ['firebase/storage'],
          'components': [
            './src/components/Authenticated/Dashboard/PlantComponents/PlantCard.vue',
            './src/components/Authenticated/Dashboard/GreenhouseDetail.vue',
            './src/components/Authenticated/Dashboard/DashboardComponents/WeatherCard.vue'
          ]
        }
      }
    }
  },
  server: {
    port: 8080,
    hot: true,
  },
  publicDir: path.resolve(__dirname, "public"),
});