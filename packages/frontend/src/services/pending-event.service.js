import {
  meditationStoreName,
  pendingEventStoreName,
} from "../storage/store-names.constants";

export class PendingEventService {
  constructor(transactionService, pendingEventStore, eventProcessor) {
    this.transactionService = transactionService;
    this.pendingEventStore = pendingEventStore;
    this.eventProcessor = eventProcessor;
  }

  async addPendingEvent(event) {
    await this.transactionService.runWriteTransaction(
      [pendingEventStoreName, meditationStoreName],
      async (transaction) => {
        await this.eventProcessor.processEvent(transaction, event);
        await this.pendingEventStore.add(event)(transaction);
      },
    );
  }
}
