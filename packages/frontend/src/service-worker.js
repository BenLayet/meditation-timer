import { precacheAndRoute } from "workbox-precaching";
import build from "../../../build.json";
import { resolveDependencies } from "domain/src/lib/config/resolveDependencies.js";
import { serviceWorkerProviders } from "./service-worker.providers.js";

console.debug(`Service Worker Loaded. Build : ${JSON.stringify(build)}`);
// Automatically precache all files referenced in __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Event listener for sync event
self.addEventListener("message", (event) => {
  if (event.data.type === "synchronizationRequested") {
    event.waitUntil(synchronizeEvents());
  }
});

async function synchronizeEvents() {
  console.debug("synchronizeEvents called");

  const { accountService, eventSynchronizationService, indexedDb } =
    await resolveDependencies(serviceWorkerProviders);
  try {
    if (await accountService.isAuthenticated()) {
      await eventSynchronizationService.synchronizeEvents();
      console.debug("Events synchronized");
    } else {
      console.debug("User not authenticated, no synchronization attempted");
    }
  } catch (e) {
    console.error(e);
  } finally {
    indexedDb.close();
  }
}
