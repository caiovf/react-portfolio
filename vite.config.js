import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Modernized Sass approach using @use to avoid deprecation and fix resolution
        additionalData: `@use "@/styles/_variables.scss" as *;`,
      },
    },
  },
  ssr: {
    noExternal: ["swiper", "dompurify"],
  },
  optimizeDeps: {
    include: ["swiper", "swiper/react"],
  }
});
