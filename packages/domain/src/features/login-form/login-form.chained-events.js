import { loginFormEvents } from "./login-form.events.js";
import { loginFormSelectors } from "./login-form.selectors.js";

export const loginFormChainedEvents = [
  {
    onEvent: loginFormEvents.formSubmitted,
    thenDispatch: loginFormEvents.loginRequested,
    withPayload: ({ state }) => ({
      login: loginFormSelectors.loginInputValue(state),
      password: loginFormSelectors.passwordInputValue(state),
    }),
  },
];
