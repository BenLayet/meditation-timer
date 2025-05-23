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

export const resolveEffectsDependencies = async () => {
  const indexedDb = await createIndexedDb(meditationsIndexedDbSchema);
  const transactionService = new TransactionService(indexedDb);

  const keyValueStore = new KeyValueStore(keyValueStoreName);
  const keyValueStorageService = new KeyValueStorageService(
    keyValueStore,
    transactionService,
  );
  const meditationStore = new CollectionStore(meditationStoreName);
  const pendingEventStore = new CollectionStore(pendingEventStoreName);
  const eventProcessor = new EventProcessor(meditationStore);
  const synchronizationTaskService = new SynchronizationTaskService();
  const pendingEventService = new PendingEventService(
    transactionService,
    pendingEventStore,
    eventProcessor,
    synchronizationTaskService,
  );

  const meditationService = new MeditationService(
    transactionService,
    pendingEventService,
    meditationStore,
  );
  const emailVerificationApi = new EmailVerificationApi(meditationStore);
  const emailVerificationService = new EmailVerificationService(
    keyValueStorageService,
    emailVerificationApi,
  );
  return {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
    emailVerificationService,
    keyValueStorageService,
  };
};
