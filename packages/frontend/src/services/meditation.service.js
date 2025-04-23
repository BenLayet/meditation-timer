export class MeditationService {
  constructor(transactionService, eventService, meditationStore) {
    this.transactionService = transactionService;
    this.eventService = eventService;
    this.meditationStore = meditationStore;
  }
  async saveMeditation(meditation) {
    await this.eventService.addPendingEvent({
      type: "meditation",
      action: "create",
      data: meditation,
    });
  }
  async getAllMeditations() {
    return this.transactionService.runReadTransaction(
      [this.meditationStore],
      async (transaction) => this.meditationStore.getAll(transaction)
    );
  }
}
