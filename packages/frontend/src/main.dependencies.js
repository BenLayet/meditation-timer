import { MeditationService } from "./services/meditation.service.js";
import { CollectionStore } from "./storage/collection.store.js";
import { wakeLockService } from "./services/wake-lock.service.js";
import { gongService } from "./services/gong.service.js";
import { tickingService } from "./services/ticking.service.js";
import { createIndexedDb } from "./storage/indexed-db.js";
import {
  meditationsIndexedDbSchema,
} from "./storage/meditations.indexed-db.schema.js";
import {
  meditationStoreName,
  pendingEventStoreName,
} from "./storage/store-names.constants.js";
import { EventProcessor } from "./services/event-processor.service.js";
import { TransactionService } from "./storage/transaction.service.js";
import { PendingEventService } from "./services/pending-event.service.js";

export const resolveEffectsDependencies = async () => {
  const indexedDb = await createIndexedDb(meditationsIndexedDbSchema);
  const transactionService = new TransactionService(indexedDb);

  const meditationStore = new CollectionStore(meditationStoreName);
  const pendingEventStore = new CollectionStore(pendingEventStoreName);
  const eventProcessor = new EventProcessor(meditationStore);

  const pendingEventService = new PendingEventService(
    transactionService,
    pendingEventStore,
    eventProcessor
  );

  const meditationService = new MeditationService(
    transactionService,
    pendingEventService,
    meditationStore
  );
  return {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
  };
};
