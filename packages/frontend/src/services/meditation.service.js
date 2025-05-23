import { v4 as createUuid } from "uuid";

export class MeditationService {
  constructor(transactionService, pendingEventService, meditationStore) {
    this.transactionService = transactionService;
    this.pendingEventService = pendingEventService;
    this.meditationStore = meditationStore;
  }
  async saveMeditation(meditation) {
    await this.pendingEventService.addPendingEvent({
      type: "ADD_MEDITATION",
      payload: { ...meditation, uuid: createUuid() },
      uuid: createUuid(),
    });
  }
  async getAllMeditations() {
    return this.transactionService.runReadTransaction(
      [this.meditationStore.storeName],
      async (transaction) => this.meditationStore.getAll(transaction),
    );
  }
}
