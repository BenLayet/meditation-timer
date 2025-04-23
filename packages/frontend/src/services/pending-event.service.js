import { pendingEventStoreName, meditationStoreName } from "../storage/store-names.constants";

export class PendingEventService {
  constructor(
    transactionService,
    pendingEventStore,
    eventProcessor
  ) {
    this.transactionService = transactionService;
    this.pendingEventStore = pendingEventStore;
    this.eventProcessor = eventProcessor;
  }
  async addPendingEvent(event) {
    this.transactionService.runWriteTransaction(
      [pendingEventStoreName, meditationStoreName],
      async (transaction) => {
        await this.eventProcessor.processEvent(transaction, event);
        await this.pendingEventStore.add(event)(transaction);
        registerSyncTask();
      }
    );
  }
}


function registerSyncTask() {
  // Register the sync task if the service worker is ready
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.sync.register("sync-events").catch((err) => {
        console.error("Failed to register sync-events:", err);
      });
    });
  } else {
    console.error("Background Sync is not supported in this browser.");
  }
}
