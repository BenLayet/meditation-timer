import { synchronizationChainedEvents } from "./synchronization.chained-events.js";
import { SYNCHRONIZATION_INITIAL_STATE } from "./synchronization.state.js";
import { synchronizationSelectors } from "./synchronization.selectors.js";
import { synchronizationEvents } from "./synchronization.events.js";

export const synchronizationComponent = {
  initialState: SYNCHRONIZATION_INITIAL_STATE,
  chainedEvents: synchronizationChainedEvents,
  selectors: synchronizationSelectors,
  events: synchronizationEvents,
};
