import { createAccountFormEvents } from "./create-account-form.events.js";

export const createAccountFormChainedEvents = [
  {
    onEvent: createAccountFormEvents.loginInputCompleted,
    onCondition: ({ state }) => state.ownState.hasLoginInputChanged,
    thenDispatch: createAccountFormEvents.validationRequested,
  },
];
