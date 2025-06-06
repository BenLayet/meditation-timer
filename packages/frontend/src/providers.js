import { MeditationService } from "./services/meditation.service.js";
import { CollectionStore } from "./storage/collection.store.js";
import { wakeLockService } from "./services/wake-lock.service.js";
import { gongService } from "./services/gong.service.js";
import { tickingService } from "./services/ticking.service.js";
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

export const providers = {
  indexedDb: async ({ schema = meditationsIndexedDbSchema }) =>
    createIndexedDb(schema),
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
  synchronizationTaskService: () => new SynchronizationTaskService(),
  pendingEventService: ({
    transactionService,
    pendingEventStore,
    eventProcessor,
    synchronizationTaskService,
  }) =>
    new PendingEventService(
      transactionService,
      pendingEventStore,
      eventProcessor,
      synchronizationTaskService,
    ),
  meditationService: ({ indexedDb, meditationStore }) =>
    new MeditationService(indexedDb, meditationStore),
  emailVerificationApi: () => new EmailVerificationApi(),
  emailVerificationService: async ({
    keyValueStorageService,
    emailVerificationApi,
  }) =>
    new EmailVerificationService(keyValueStorageService, emailVerificationApi),
  wakeLockService: () => wakeLockService,
  gongService: () => gongService,
  tickingService: () => tickingService,
};
