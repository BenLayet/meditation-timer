import { createAccountFormEvents } from "./create-account-form.events.js";
import { loginFormSelectors } from "../login-form/login-form.selectors.js";
import { createAccountFormSelectors } from "./create-account-form.selectors.js";

export const createAccountFormChainedEvents = [
  {
    onEvent: createAccountFormEvents.loginInputCompleted,
    onCondition: ({ state }) => state.ownState.hasLoginInputChanged,
    thenDispatch: createAccountFormEvents.validationRequested,
  },
  {
    onEvent: createAccountFormEvents.formSubmitted,
    thenDispatch: createAccountFormEvents.createAccountRequested,
    withPayload: ({ state }) => ({
      login: createAccountFormSelectors.loginInputValue(state),
    }),
  },
];
