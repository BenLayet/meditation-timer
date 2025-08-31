import { precacheAndRoute } from "workbox-precaching";
import build from "../../../build.json";
import { resolveDependencies } from "domain/src/lib/config/resolveDependencies.js";
import { serviceWorkerProviders } from "./service-worker.providers.js";

//disables log output from workbox
self.__WB_DISABLE_DEV_LOGS = true;

console.debug(`Service Worker Loaded. Build : ${JSON.stringify(build)}`);
// Automatically precache all files referenced in __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Event listener for sync event
self.addEventListener("message", (event) => {
  if (event.data.type === "synchronizationRequested") {
    event.waitUntil(synchronizeEvents(createCallback(event.source.id)));
  }
});
function createCallback(clientId) {
  return async (message, payload = {}) =>
    await self.clients.get(clientId).then((client) => {
      if (client) client.postMessage({ type: message, payload });
    });
}

async function synchronizeEvents(callback) {
  console.debug("synchronizationRequested");

  const { accountService, eventSynchronizationService, indexedDb } =
    await resolveDependencies(serviceWorkerProviders);

  try {
    if (await accountService.isAuthenticated()) {
      console.debug("synchronizationStarted");
      await callback("synchronizationStarted");
      await eventSynchronizationService.synchronizeEvents();
      console.debug("synchronizationSucceeded");
      await callback("synchronizationSucceeded");
    } else {
      console.debug("User not authenticated, no synchronization attempted");
      await callback("synchronizationNotAttempted");
    }
  } catch (e) {
    console.error(e);
    console.debug("synchronizationFailed");
    await callback("synchronizationFailed", { errorCodes: e.errorCodes });
  } finally {
    indexedDb.close();
  }
}
