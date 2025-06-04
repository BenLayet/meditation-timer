import {
  keyValueStoreName,
  meditationStoreName,
  pendingEventStoreName,
} from "../storage/store-names.constants";
import { validateNotEmptyString } from "domain/src/lib/assert/not-null.validator.js";

const PAGE_SIZE = 100;
export const lastProcessedIdKey = "lastProcessedId";

export class EventSynchronizationService {
  constructor(
    transactionService,
    pendingEventStore,
    keyValueStore,
    eventProcessor,
    eventApi,
    accountService,
  ) {
    this.transactionService = transactionService;
    this.pendingEventStore = pendingEventStore;
    this.keyValueStore = keyValueStore;
    this.eventApi = eventApi;
    this.eventProcessor = eventProcessor;
    this.accountService = accountService;
  }
  async synchronizeEvents() {
    await this.postAllPendingEvents();
    await this.processRemoteEvents();
  }

  postAllPendingEvents = async () => {
    // Get user token
    const userToken = await this.accountService.getUserToken();

    // Get all pending events
    const pendingEvents = await this.transactionService.runReadTransaction(
      [pendingEventStoreName],
      this.pendingEventStore.getAll,
    );
    // Map each event to a promise
    const promises = pendingEvents.map(this.eventApi.postEvent(userToken));
    // Wait for all promises to resolve
    await Promise.all(promises);
  };

  processRemoteEvents = async () => {
    let hasNextPage = true;
    while (hasNextPage) {
      hasNextPage = await this.processRemoteEventsPage();
    }
  };

  processRemoteEventsPage = async () => {
    // Get user token
    const userToken = await this.accountService.getUserToken();

    // Get lastProcessedId
    const lastProcessedId =
      (await this.transactionService.runReadTransaction(
        [keyValueStoreName],
        this.keyValueStore.get(lastProcessedIdKey),
      )) ?? 0;

    const page = await this.eventApi.getEventPage(userToken)(
      lastProcessedId,
      PAGE_SIZE,
    );
    for (const event of page.entities) {
      await this.processRemoteEvent(event);
    }
    return page.hasNextPage;
  };

  processRemoteEvent = async (event) => {
    await this.transactionService.runWriteTransaction(
      [pendingEventStoreName, meditationStoreName, keyValueStoreName],
      async (transaction) => {
        if (await this.pendingEventStore.existsById(event.uuid)(transaction)) {
          await this.pendingEventStore.deleteById(event.uuid)(transaction);
        } else {
          await this.eventProcessor.processEvent(transaction, event);
        }
        await this.keyValueStore.set(lastProcessedIdKey, event.id)(transaction);
      },
    );
  };
}
