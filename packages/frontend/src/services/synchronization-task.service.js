import { synchronizationErrorCodes } from "domain/src/models/synchronization.model.js";

export class SynchronizationTaskService {
  eventListenerAdded = false;

  async queueSynchronizationTask(callbacks) {
    console.debug("queueSynchronizationTask called");
    // Register the sync task if the service worker is ready
    if ("serviceWorker" in navigator) {
      await this.ensureSwListenersAreAdded(callbacks);
      await navigator.serviceWorker.ready.then((registration) =>
        registration.active.postMessage({ type: "synchronizationRequested" }),
      );
    } else {
      console.error("service worker not supported");
      callbacks.onFailed({
        errorCodes: [synchronizationErrorCodes.SERVICE_WORKER_NOT_REGISTERED],
      });
    }
  }
  async ensureSwListenersAreAdded(callbacks) {
    if (!this.eventListenerAdded) {
      this.eventListenerAdded = true;
      await addEventListener(callbacks);
    }
  }
}

async function ensureSWControl() {
  if (navigator.serviceWorker.controller) return Promise.resolve();
  return new Promise((resolve) => {
    navigator.serviceWorker.addEventListener("controllerchange", () =>
      resolve(),
    );
  });
}

async function addEventListener({
  onNotAttempted,
  onStarted,
  onSucceeded,
  onFailed,
}) {
  await ensureSWControl();
  navigator.serviceWorker.addEventListener("message", (event) => {
    const { type } = event.data || {};
    switch (type) {
      case "synchronizationNotAttempted":
        onNotAttempted();
        break;
      case "synchronizationStarted":
        onStarted();
        break;
      case "synchronizationSucceeded":
        onSucceeded();
        break;
      case "synchronizationFailed":
        onFailed();
        break;
      default:
        console.debug("unknown message type");
    }
  });
}
