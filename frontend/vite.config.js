import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set frontend to run on port 3000 (or another available port)
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Proxy requests to backend on port 5000
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
