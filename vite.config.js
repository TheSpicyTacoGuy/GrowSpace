// This is the Vite configuration file. It is used to configure the Vite development server and build process.
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vendor chunk groups, resolved against the module id. Rolldown only accepts a
// function for `manualChunks`, so the groups are matched explicitly.
const chunkGroups = [
  {
    name: "vendor",
    match: /[\\/]node_modules[\\/](?:@vue|vue|vue-router)[\\/]/,
  },
  { name: "bootstrap", match: /[\\/]node_modules[\\/](?:bootstrap|@popperjs)[\\/]/ },
  {
    name: "firebase-app",
    match: /[\\/]node_modules[\\/](?:firebase[\\/]app|@firebase[\\/]app)[\\/]/,
  },
  {
    name: "firebase-auth",
    match: /[\\/]node_modules[\\/](?:firebase[\\/]auth|@firebase[\\/]auth)[\\/]/,
  },
  {
    name: "firebase-firestore",
    match:
      /[\\/]node_modules[\\/](?:firebase[\\/]firestore|@firebase[\\/]firestore)[\\/]/,
  },
  {
    name: "firebase-storage",
    match:
      /[\\/]node_modules[\\/](?:firebase[\\/]storage|@firebase[\\/]storage)[\\/]/,
  },
];

function resolveChunkName(id) {
  for (const group of chunkGroups) {
    if (group.match.test(id)) {
      return group.name;
    }
  }
  return undefined;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // src/.env is read directly so the dev server and the build agree on whether
  // real Firebase credentials are available.
  const env = loadEnv(mode, path.resolve(__dirname, "src"), "");
  const demoMode = !env.VITE_FIREBASE_API_KEY || !env.VITE_FIREBASE_PROJECT_ID;

  const alias = {
    "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@components": path.resolve(__dirname, "src/components"),
    "@composables": path.resolve(__dirname, "src/composables"),
    "@js": path.resolve(__dirname, "src/js"),
  };

  if (demoMode) {
    alias["firebase/app"] = path.resolve(__dirname, "src/js/demo/app.js");
    alias["firebase/firestore"] = path.resolve(
      __dirname,
      "src/js/demo/firestore.js"
    );
    alias["firebase/auth"] = path.resolve(__dirname, "src/js/demo/auth.js");
  }

  return {
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
          plugins: [{ name: "preset-default" }],
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
      alias,
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
        output: {
          manualChunks: resolveChunkName,
        },
      },
    },
    server: {
      port: 8080,
      hot: true,
    },
    publicDir: path.resolve(__dirname, "public"),
  };
});
