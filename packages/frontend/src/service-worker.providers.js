import { MeditationService } from "./services/meditation.service.js";
import { CollectionStore } from "./storage/collection.store.js";
import { WakeLockService } from "./services/wake-lock.service.js";
import { GongService } from "./services/gong.service.js";
import { createIndexedDb } from "./storage/indexed-db.js";
import { meditationsIndexedDbSchema } from "./storage/meditations.indexed-db.schema.js";
import {
  keyValueStoreName,
  meditationStoreName,
  pendingEventStoreName,
} from "./storage/store-names.constants.js";
import { EventProcessor } from "./services/event-processor.service.js";
import { TransactionService } from "./storage/transaction.service.js";
import { PendingEventService } from "./services/pending-event.service.js";
import { SynchronizationTaskService } from "./services/synchronization-task.service.js";
import { EmailVerificationApi } from "./http-clients/email-verification.api.js";
import { KeyValueStore } from "./storage/key-value.store.js";
import { KeyValueStorageService } from "./services/key-value-storage.service.js";
import { EmailVerificationService } from "./services/email-verification.service.js";
import { TickingService } from "./services/ticking.service.js";
import { EventApi } from "./http-clients/event.api.js";
import { AccountService } from "./services/account.service.js";
import { EventSynchronizationService } from "./services/event-synchronization.service.js";

export const serviceWorkerProviders = {
  indexedDb: async ({ schema = meditationsIndexedDbSchema }) =>
    createIndexedDb(schema),
  eventApi: () => new EventApi(),
  transactionService: ({ indexedDb }) => new TransactionService(indexedDb),
  keyValueStore: ({ storeName = keyValueStoreName }) =>
    new KeyValueStore(storeName),
  keyValueStorageService: ({ keyValueStore, transactionService }) =>
    new KeyValueStorageService(keyValueStore, transactionService),
  meditationStore: ({ storeName = meditationStoreName }) =>
    new CollectionStore(storeName),
  pendingEventStore: ({ storeName = pendingEventStoreName }) =>
    new CollectionStore(storeName),
  eventProcessor: ({ meditationStore }) => new EventProcessor(meditationStore),
  accountService: ({ keyValueStorageService }) =>
    new AccountService(keyValueStorageService),
  eventSynchronizationService: ({
    transactionService,
    pendingEventStore,
    keyValueStore,
    eventProcessor,
    eventApi,
    accountService,
  }) =>
    new EventSynchronizationService(
      transactionService,
      pendingEventStore,
      keyValueStore,
      eventProcessor,
      eventApi,
      accountService,
    ),
};
