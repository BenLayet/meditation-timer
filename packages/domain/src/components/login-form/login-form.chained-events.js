import { loginFormEvents } from "./login-form.events.js";

export const loginFormChainedEvents = [
  {
    onEvent: loginFormEvents.loginInputCompleted,
    onCondition: ({ state }) => state.ownState.hasLoginInputChanged,
    thenDispatch: loginFormEvents.validationRequested,
  },
];
