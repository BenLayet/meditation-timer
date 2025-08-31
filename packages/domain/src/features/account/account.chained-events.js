import { accountEvents } from "./account.events.js";
import { loginFormEvents } from "../login-form/login-form.events.js";
import { createAccountFormEvents } from "../create-account-form/create-account-form.events.js";
import { accountStatus } from "../../models/account.model.js";
import { synchronizationEvents } from "../synchronization/synchronization.events.js";
import { accountSelectors } from "./account.selectors.js";

export const accountChainedEvents = [
  {
    onEvent: {
      ...createAccountFormEvents.createAccountSucceeded,
      childComponentPath: ["createAccountForm"],
    },
    thenDispatch: accountEvents.accountNewlyAuthenticated,
  },
  {
    onEvent: {
      ...loginFormEvents.loginSucceeded,
      childComponentPath: ["loginForm"],
    },
    thenDispatch: accountEvents.accountNewlyAuthenticated,
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
  {
    onEvent: accountEvents.loadAccountRequested,
    thenDispatch: accountEvents.retrievePersistedAccountRequested,
  },
  {
    onEvent: accountEvents.retrievePersistedAccountCompleted,
    thenDispatch: accountEvents.accountLoaded,
  },
  {
    onEvent: accountEvents.accountNewlyAuthenticated,
    thenDispatch: accountEvents.persistAccountRequested,
  },
  {
    onEvent: accountEvents.disconnectRequested,
    thenDispatch: accountEvents.deletePersistedAccountRequested,
  },
  {
    onEvent: accountEvents.deletePersistedAccountCompleted,
    thenDispatch: accountEvents.disconnectSucceeded,
  },
  {
    onEvent: accountEvents.disconnectSucceeded,
    thenDispatch: accountEvents.createAccountFormRequested,
  },
  {
    onEvent: accountEvents.accountNewlyAuthenticated,
    thenDispatch: accountEvents.accountAuthenticated,
  },
  {
    onEvent: accountEvents.accountLoaded,
    onCondition: ({ state }) => accountSelectors.isAuthenticated(state),
    thenDispatch: accountEvents.accountAuthenticated,
  },
  {
    onEvent: accountEvents.accountLoaded,
    thenDispatch: accountEvents.loadAccountCompleted,
  },
  {
    onEvent: accountEvents.accountNewlyAuthenticated,
    thenDispatch: accountEvents.loadAccountCompleted,
  },
  {
    onEvent: accountEvents.loadAccountCompleted,
    thenDispatch: {
      ...synchronizationEvents.synchronizationRequested,
      childComponentPath: ["synchronization"],
    },
  },
];
