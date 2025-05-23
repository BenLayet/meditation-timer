import {
  meditationStoreName,
  pendingEventStoreName,
} from "../storage/store-names.constants";

export class PendingEventService {
  constructor(
    transactionService,
    pendingEventStore,
    eventProcessor,
    synchronizationTaskService,
  ) {
    this.transactionService = transactionService;
    this.pendingEventStore = pendingEventStore;
    this.eventProcessor = eventProcessor;
    this.synchronizationTaskService = synchronizationTaskService;
  }

  async addPendingEvent(event) {
    await this.transactionService.runWriteTransaction(
      [pendingEventStoreName, meditationStoreName],
      async (transaction) => {
        await this.eventProcessor.processEvent(transaction, event);
        await this.pendingEventStore.add(event)(transaction);
        await this.synchronizationTaskService.queueSynchronizationTask();
      },
    );
  }
}
