import { createAccountFormInitialState } from "./create-account-form.state.js";
import { createAccountFormEvents } from "./create-account-form.events.js";
import { createAccountFormSelectors } from "./create-account-form.selectors.js";
import { createAccountFormChainedEvents } from "./create-account-form.chained-events.js";

export const createAccountFormComponent = {
  initialState: createAccountFormInitialState,
  events: createAccountFormEvents,
  selectors: createAccountFormSelectors,
  chainedEvents: createAccountFormChainedEvents,
};
