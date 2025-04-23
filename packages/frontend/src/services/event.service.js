export class EventService {
  constructor(
    transactionService,
    userUuidService,
    pendingEventStore,
    meditationStore
  ) {
    this.transactionService = transactionService;
    this.userUuidService = userUuidService;
    this.pendingEventStore = pendingEventStore;
    this.meditationStore = meditationStore;
  }
  async addPendingEvent(event) {
    const userUuid = this.userUuidService.getUuid();
    const eventWithUuid = { ...event, userUuid };
    this.transactionService.runWriteTransaction(
      [this.pendingEventStore, this.meditationStore],
      async (transaction) => {
        await this.eventProcessor.processEvent(transaction, eventWithUuid);
        await this.pendingEventStore.addWithinTransaction(transaction, eventWithUuid);
        registerSyncTask();
      }
    );
  }
}

export class EventProcessor {
  constructor(meditationStore) {
    this.meditationStore = meditationStore;
  }
  async processEvent(transaction, event) {
    switch (event.type) {
      case "meditation":
        await this.processMeditationEvent(transaction, event);
        break;
      default:
        console.warn(`Unknown event type: ${event.type}`);
    }
  }

  async processMeditationEvent(transaction, event) {
    const meditation = event.data;
    switch (event.action) {
      case "create":
        await this.meditationStore.addWithinTransaction(
          transaction,
          meditation
        );
        break;
      default:
        console.warn(`Unknown action: ${event.action}`);
    }
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
