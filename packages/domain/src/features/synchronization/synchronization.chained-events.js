import { synchronizationEvents } from "./synchronization.events.js";

export const synchronizationChainedEvents = [
  {
    onEvent: synchronizationEvents.refreshRequested,
    thenDispatch: synchronizationEvents.synchronizationRequested,
  },
];
