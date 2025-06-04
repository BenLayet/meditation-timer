import { resolveServiceWorkerDependencies } from "./service-worker.dependencies.js";

/*
const CACHE_NAME = "app-cache-v1"; // Increment this version when deploying new files!

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  // Pre-cache app shell or necessary files
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/", // Ensure index.html is cached
        "/main.js", // Update to hashed file for cache busting
        "/styles.css",
      ]);
    }),
  );
});
 */

self.addEventListener("activate", async (event) => {
  console.log("Service worker activate");
  console.log(event);
  // Remove old caches
  /*
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );

   */
  await self.clients.claim(); // Take control of open pages immediately

  event.waitUntil(synchronizeEvents());
});
// Event listener for sync event
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-events") {
    event.waitUntil(synchronizeEvents());
  }
});

async function synchronizeEvents() {
  console.log("synchronizeEvents called");

  const { accountService, eventSynchronizationService, indexedDb } =
    await resolveServiceWorkerDependencies();
  if (await accountService.isAuthenticated()) {
    await eventSynchronizationService.synchronizeEvents();
    console.log("Events synchronized");
  } else {
    console.log("User not authenticated, no synchronization attempted");
  }

  indexedDb.close();
  console.log("IndexedDB closed");
}
