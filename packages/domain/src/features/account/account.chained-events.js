import { accountEvents } from "./account.events.js";
import { loginFormEvents } from "../login-form/login-form.events.js";
import { createAccountFormEvents } from "../create-account-form/create-account-form.events.js";
import { accountStatus } from "../../models/account.model.js";

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
    withPayload: ({ previousPayload }) => ({
      account: previousPayload.account,
      status: previousPayload.account
        ? accountStatus.AUTHENTICATED
        : accountStatus.ANONYMOUS,
    }),
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
];
