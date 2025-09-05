import { synchronizationEvents } from "./synchronization.events.js";

export const synchronizationChainedEvents = [
  {
    onEvent: synchronizationEvents.refreshRequested,
    thenDispatch: synchronizationEvents.synchronizationRequested,
  },
  {
    onEvent: synchronizationEvents.synchronizationSucceeded,
    thenDispatch: synchronizationEvents.synchronizationCompleted,
  },
  {
    onEvent: synchronizationEvents.synchronizationFailed,
    thenDispatch: synchronizationEvents.synchronizationCompleted,
  },
  {
    onEvent: synchronizationEvents.synchronizationNotAttempted,
    thenDispatch: synchronizationEvents.synchronizationCompleted,
  },
];
