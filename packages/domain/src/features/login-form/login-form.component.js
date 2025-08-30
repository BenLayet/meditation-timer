import { loginFormInitialState } from "./login-form.state.js";
import { loginFormEvents } from "./login-form.events.js";
import { loginFormSelectors } from "./login-form.selectors.js";
import { loginFormChainedEvents } from "./login-form.chained-events.js";

export const loginFormComponent = {
  initialState: loginFormInitialState,
  events: loginFormEvents,
  selectors: loginFormSelectors,
  chainedEvents: loginFormChainedEvents,
};
