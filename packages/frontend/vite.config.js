import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  console.log("starting vite. mode:", mode);
  const env = loadEnv(mode, process.cwd(), "");
  const apiPort = env.API_PORT || "8000";
  const apiProxy = `http://localhost:${apiPort}`;
  console.log("API Proxy:", apiProxy);
  return {
    build: {
      target: "esnext",
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: apiProxy,
          changeOrigin: true,
        },
      },
    },
  };
});
