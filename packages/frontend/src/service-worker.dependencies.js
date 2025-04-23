import { CollectionStore } from "./storage/collection.store.js";
import { createIndexedDb } from "./storage/indexed-db.js";
import {
  meditationsIndexedDbSchema,
  meditationStoreName,
  pendingEventStoreName,
} from "./storage/meditations.indexed-db.schema.js";
import { EventProcessor } from "./services/event-processor.service.js";
import { TransactionService } from "./storage/transaction.service.js";
import { UserUuidCookie } from "./http-clients/user-uuid.cookie.js";
import { EventsApi } from "./http-clients/event.api.js";
import { EventSynchronizationService } from "./services/event-synchronization.service.js";
import { keyValueStoreName } from "./storage/store-names.constants.js";
import { KeyValueStore } from "./storage/key-value.store.js";

export const resolveServiceWorkerDependencies = async () => {
  const indexedDb = await createIndexedDb(meditationsIndexedDbSchema);
  const userUuidCookie = new UserUuidCookie();
  const eventsApi = new EventsApi(userUuidCookie);
  const transactionService = new TransactionService(indexedDb);
  const meditationStore = new CollectionStore(meditationStoreName);
  const pendingEventStore = new CollectionStore(pendingEventStoreName);
  const keyValueStore = new KeyValueStore(keyValueStoreName);
  const eventProcessor = new EventProcessor(meditationStore);
  const eventSynchronizationService = new EventSynchronizationService(
    transactionService,
    pendingEventStore,
    keyValueStore,
    eventProcessor,
    eventsApi
  );
  return {
    eventSynchronizationService,indexedDb
  };
};
