import { MeditationService } from "./services/meditation.service.js";
import { CollectionStore } from "./storage/collection.store.js";
import { wakeLockService } from "./services/wake-lock.service.js";
import { gongService } from "./services/gong.service.js";
import { tickingService } from "./services/ticking.service.js";
import { createIndexedDb } from "./storage/indexed-db.js";
import {
  meditationsIndexedDbSchema,
  meditationStoreName,
  pendingEventStoreName,
} from "./storage/meditations.indexed-db.schema.js";
import { UserUuidService } from "./services/device-uuid.service.js";
import { TransactionService } from "./storage/transaction.service.js";
import { EventService } from "./services/event.service.js";

export const resolveEffectsDependencies = async () => {
  const userUuidService = new UserUuidService();
  const indexedDb = await createIndexedDb(meditationsIndexedDbSchema);
  const transactionService = new TransactionService(indexedDb);

  const meditationStore = new CollectionStore(meditationStoreName);
  const pendingEventStore = new CollectionStore(pendingEventStoreName);

  const eventService = new EventService(
    transactionService,
    userUuidService,
    pendingEventStore,
    meditationStore
  );

  const meditationService = new MeditationService(
    transactionService,
    eventService,
    meditationStore
  );
  return {
    meditationService,
    gongService,
    wakeLockService,
    tickingService,
  };
};
