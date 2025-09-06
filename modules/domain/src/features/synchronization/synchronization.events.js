import { z } from "zod";

const lastSynchronizedEpochPayload = z.object({
  lastSynchronizedEpochSeconds: z.number().int().positive(),
});
const errorCodesPayload = z.object({
  errorCodes: z.array(z.string()),
});

export const synchronizationEvents = {
  refreshRequested: {
    eventType: "refreshRequested",
    isNewCycle: true,
  },
  synchronizationRequested: {
    eventType: "synchronizationRequested",
  },
  synchronizationStarted: {
    eventType: "synchronizationStarted",
    handler: (state) => ({ ...state, isSynchronizing: true, errorCodes: [] }),
  },
  synchronizationNotAttempted: {
    eventType: "synchronizationNotAttempted",
    handler: (state) => ({ ...state, isSynchronizing: false, errorCodes: [] }),
  },
  synchronizationSucceeded: {
    eventType: "synchronizationSucceeded",
    payloadShape: lastSynchronizedEpochPayload,
    handler: (state, payload) => ({
      ...state,
      lastSynchronizedEpochSeconds: payload.lastSynchronizedEpochSeconds,
      isSynchronizing: false,
      errorCodes: [],
    }),
  },
  synchronizationFailed: {
    eventType: "synchronizationFailed",
    payloadShape: errorCodesPayload,
    handler: (state, payload) => ({
      ...state,
      isSynchronizing: false,
      errorCodes: payload.errorCodes,
    }),
  },
  persistLastSynchronizedEpochRequested: {
    eventType: "persistLastSynchronizedEpochRequested",
    payloadShape: lastSynchronizedEpochPayload,
  },
  retrieveLastSynchronizedEpochRequested: {
    eventType: "retrieveLastSynchronizedEpochRequested",
  },
  retrieveLastSynchronizedEpochCompleted: {
    eventType: "retrieveLastSynchronizedEpochCompleted",
    payloadShape: lastSynchronizedEpochPayload,
  },
  synchronizationCompleted: {
    eventType: "synchronizationCompleted",
  },
};
