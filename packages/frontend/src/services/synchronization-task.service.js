export class SynchronizationTaskService {
  async queueSynchronizationTask() {
    // Register the sync task if the service worker is ready
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.ready.then((registration) =>
        registration.active.postMessage({ type: "synchronizationRequested" }),
      );
    } else {
      console.error("service worker not supported");
    }
  }
}
