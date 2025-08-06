import { accountEvents } from "./account.events.js";
import { loginFormEvents } from "../login-form/login-form.events.js";
import { createAccountFormEvents } from "../create-account-form/create-account-form.events.js";

export const accountChainedEvents = [
  {
    onEvent: {
      ...createAccountFormEvents.createAccountSucceeded,
      childComponentPath: ["createAccountForm"],
    },
    thenDispatch: accountEvents.accountAuthenticated,
  },
  {
    onEvent: {
      ...loginFormEvents.loginSucceeded,
      childComponentPath: ["loginForm"],
    },
    thenDispatch: accountEvents.accountAuthenticated,
  },
  {
    onEvent: accountEvents.createAccountFormRequested,
    thenDispatch: {
      ...createAccountFormEvents.resetRequested,
      childComponentPath: ["createAccountForm"],
    },
  },
  {
    onEvent: accountEvents.loginFormRequested,
    thenDispatch: {
      ...loginFormEvents.resetRequested,
      childComponentPath: ["loginForm"],
    },
  },
];
