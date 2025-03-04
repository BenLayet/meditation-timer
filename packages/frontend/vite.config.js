import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Meditation Timer',
        short_name: 'Meditation Timer',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        screenshots: [
          {
            src: '/screenshot.png',
            sizes: '321x643',
            type: 'image/png',
            description: 'Main meditation timer screen',
          },
          {
            src: '/screenshot-wide.png',
            sizes: '747x645',
            type: 'image/png',
            form_factor: 'wide',
            description: 'Main meditation timer screen',
          },

        ],
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,webmanifest}'],
        cleanupOutdatedCaches: true,
      },

    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  },
});