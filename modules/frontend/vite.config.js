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
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        injectManifest: {
          globPatterns: [
            "**/*.{js,css,html,png,jpg,jpeg,svg,ogg,json,ico,woff2}",
          ],
        },
        devOptions: {
          enabled: true,
          type: "module",
        },
        strategies: "injectManifest",
        srcDir: "src",
        filename: "service-worker.js",
        manifest: {
          name: "Meditation Timer",
          short_name: "Meditation Timer",
          start_url: "/",
          display: "standalone",
          background_color: "#000000",
          theme_color: "#000000",
          screenshots: [
            {
              src: "/screenshot.png",
              sizes: "321x643",
              type: "image/png",
              description: "Main meditation timer screen",
            },
            {
              src: "/screenshot-wide.png",
              sizes: "747x645",
              type: "image/png",
              form_factor: "wide",
              description: "Main meditation timer screen",
            },
          ],
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
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
