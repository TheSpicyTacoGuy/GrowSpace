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
  plugins: [
    vue(),
  ],
  root: path.resolve(__dirname, "src"),
  resolve: {
    alias: {
      // Alias the Bootstrap JS to the node_modules directory
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      // Alias for assets
      "@assets": path.resolve(__dirname, "src/assets"),
      // Alias for components
      "@components": path.resolve(__dirname, "src/components"),
      //Alias for js
      "@js": path.resolve(__dirname, "src/js"),
    },
  },
  base: "/cos30043/s101634222/project/app/",
  build: {
    outDir: path.resolve(__dirname, "app"),
    assetsDir: "assets",
    publicDir: path.resolve(__dirname, "public"),
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    hot: true,
  },
  publicDir: path.resolve(__dirname, "public"),
});