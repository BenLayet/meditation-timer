export class SynchronizationTaskService {
  async queueSynchronizationTask() {
    console.log("Service Worker supported:", "serviceWorker" in navigator);
    console.log("Background Sync supported:", "SyncManager" in window);

    // Register the sync task if the service worker is ready
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      await navigator.serviceWorker.ready.then((registration) => {
        registration.sync
          .register("sync-events")
          .then(() => console.log("SynchronizationTask queued"))
          .catch((err) =>
            console.error("Failed to queue SynchronizationTask:", err),
          );
      });
    } else {
      console.error("Background Sync is not supported in this browser.");
    }
  }
}
