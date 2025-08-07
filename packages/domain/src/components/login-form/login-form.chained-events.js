import { loginFormEvents } from "./login-form.events.js";
import { loginFormSelectors } from "./login-form.selectors.js";

export const loginFormChainedEvents = [
  {
    onEvent: loginFormEvents.loginInputCompleted,
    onCondition: ({ state }) => state.ownState.hasLoginInputChanged,
    thenDispatch: loginFormEvents.validationRequested,
  },
  {
    onEvent: loginFormEvents.formSubmitted,
    thenDispatch: loginFormEvents.loginRequested,
    withPayload: ({ state }) => ({
      login: loginFormSelectors.loginInputValue(state),
    }),
  },
];
