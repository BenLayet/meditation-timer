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

export const mainProviders = {
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
  }) =>
    new PendingEventService(
      transactionService,
      pendingEventStore,
      eventProcessor,
    ),
  meditationService: ({
    transactionService,
    pendingEventService,
    meditationStore,
  }) =>
    new MeditationService(
      transactionService,
      pendingEventService,
      meditationStore,
    ),
  emailVerificationApi: () => new EmailVerificationApi(),
  emailVerificationService: async ({
    keyValueStorageService,
    emailVerificationApi,
  }) =>
    new EmailVerificationService(keyValueStorageService, emailVerificationApi),
  wakeLockService: () => new WakeLockService(),
  gongService: () => new GongService("/bowl.ogg"),
  tickingService: () => new TickingService(),
};
