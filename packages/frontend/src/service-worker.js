import { resolveServiceWorkerDependencies } from "./service-worker.dependencies.js";
import { precacheAndRoute } from "workbox-precaching";

// Automatically precache all files referenced in __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Event listener for sync event
self.addEventListener("message", (event) => {
  if (event.data.type === "synchronizationRequested") {
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
}
