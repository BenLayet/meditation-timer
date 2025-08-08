import { createAccountFormEvents } from "./create-account-form.events.js";
import { createAccountFormSelectors } from "./create-account-form.selectors.js";

export const createAccountFormChainedEvents = [
  {
    onEvent: createAccountFormEvents.formSubmitted,
    thenDispatch: createAccountFormEvents.createAccountRequested,
    withPayload: ({ state }) => ({
      login: createAccountFormSelectors.loginInputValue(state),
      password: createAccountFormSelectors.passwordInputValue(state),
    }),
  },
];
