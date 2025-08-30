import ow from "ow";

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
    payloadShape: { lastSynchronizedEpochSeconds: ow.number.integer.positive },
    handler: (state, payload) => ({
      ...state,
      lastSynchronizedEpochSeconds: payload.lastSynchronizedEpochSeconds,
      isSynchronizing: false,
      errorCodes: [],
    }),
  },
  synchronizationFailed: {
    eventType: "synchronizationFailed",
    payloadShape: { errorCodes: ow.array.ofType(ow.string) },
    handler: (state, payload) => ({
      ...state,
      isSynchronizing: false,
      errorCodes: payload.errorCodes,
    }),
  },
  persistLastSynchronizedEpochRequested: {
    eventType: "persistLastSynchronizedEpochRequested",
    payloadShape: { lastSynchronizedEpochSeconds: ow.number.integer.positive },
  },
  retrieveLastSynchronizedEpochRequested: {
    eventType: "retrieveLastSynchronizedEpochRequested",
  },
  retrieveLastSynchronizedEpochCompleted: {
    eventType: "retrieveLastSynchronizedEpochCompleted",
    payloadShape: { lastSynchronizedEpochSeconds: ow.number.integer.positive },
  },
};
