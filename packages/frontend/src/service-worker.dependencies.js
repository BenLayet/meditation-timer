import { CollectionStore } from "./storage/collection.store.js";
import { createIndexedDb } from "./storage/indexed-db.js";
import { meditationsIndexedDbSchema } from "./storage/meditations.indexed-db.schema.js";
import {
  keyValueStoreName,
  meditationStoreName,
  pendingEventStoreName,
} from "./storage/store-names.constants.js";
import { EventProcessor } from "./services/event-processor.service.js";
import { TransactionService } from "./storage/transaction.service.js";
import { EventApi } from "./http-clients/event.api.js";
import { EventSynchronizationService } from "./services/event-synchronization.service.js";
import { KeyValueStore } from "./storage/key-value.store.js";
import { AccountService } from "./services/account.service.js";
import { KeyValueStorageService } from "./services/key-value-storage.service.js";

export const resolveServiceWorkerDependencies = async () => {
  const indexedDb = await createIndexedDb(meditationsIndexedDbSchema);
  const eventApi = new EventApi();
  const transactionService = new TransactionService(indexedDb);
  const meditationStore = new CollectionStore(meditationStoreName);
  const pendingEventStore = new CollectionStore(pendingEventStoreName);
  const keyValueStore = new KeyValueStore(keyValueStoreName);
  const eventProcessor = new EventProcessor(meditationStore);
  const keyValueStorageService = new KeyValueStorageService(
    keyValueStore,
    transactionService,
  );
  const accountService = new AccountService(keyValueStorageService);
  const eventSynchronizationService = new EventSynchronizationService(
    transactionService,
    pendingEventStore,
    keyValueStore,
    eventProcessor,
    eventApi,
    accountService,
  );
  return {
    accountService,
    eventSynchronizationService,
    indexedDb,
  };
};
