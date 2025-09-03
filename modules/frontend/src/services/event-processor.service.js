export class EventProcessor {
  constructor(meditationStore) {
    this.meditationStore = meditationStore;
  }
  async processEvent(transaction, event) {
    switch (event.type) {
      case "ADD_MEDITATION":
        const meditation = event.payload;
        await this.meditationStore.add(meditation)(transaction);
        break;
      default:
        console.warn(`Unknown event type: ${event.type}`);
    }
  }
}
