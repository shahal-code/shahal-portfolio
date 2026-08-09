import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Lucide icons separated
          "icons": ["lucide-react"],
          // Three.js isolated — only loaded when SpaceBackground mounts
          "three": ["three"],
          // Framer Motion separated from main bundle
          "framer": ["framer-motion"],
          // React core vendor chunk
          "vendor": ["react", "react-dom", "react-router-dom"],
          // Tanstack query
          "query": ["@tanstack/react-query"],
        },
      },
    },
    // Warn at 600KB instead of 500KB to reduce noise
    chunkSizeWarningLimit: 600,
  },
}));

