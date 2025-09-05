import {
  keyValueStoreName,
  meditationStoreName,
  pendingEventStoreName,
} from "../storage/store-names.constants";
import { lastProcessedIdKey } from "./synchronization.constants.js";

export class ResetSynchronizationService {
  constructor(transactionService, keyValueStore, meditationStore) {
    this.transactionService = transactionService;
    this.keyValueStore = keyValueStore;
    this.meditationStore = meditationStore;
  }
  async reset() {
    await this.transactionService.runWriteTransaction(
      [meditationStoreName, keyValueStoreName],
      async (transaction) => {
        await this.meditationStore.deleteAll()(transaction);
        await this.keyValueStore.delete(lastProcessedIdKey)(transaction);
      },
    );
  }
}
