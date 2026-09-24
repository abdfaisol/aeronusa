import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Frontend-only setup: no backend, no proxy, no SSR.
// Port 5176 dipakai seragam untuk dev, preview, dan deploy Docker.
const PORT = 5176;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: PORT,
    open: true,
  },
  preview: {
    port: PORT,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
