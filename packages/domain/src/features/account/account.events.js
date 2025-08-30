import ow from "ow";
import { accountStatus, loginRegex } from "../../models/account.model.js";

const accountShape = {
  login: ow.string.matches(loginRegex),
  userToken: ow.optional.string,
};

export const accountEvents = {
  onlineStatusChanged: {
    eventType: "onlineStatusChanged",
    payloadShape: { isOnline: ow.boolean },
    handler: (state, { isOnline }) => ({ ...state, isOnline }),
  },
  accountNewlyAuthenticated: {
    eventType: "accountNewlyAuthenticated",
    payloadShape: { account: ow.object.exactShape(accountShape) },
    handler: (state, { account }) => ({
      ...state,
      loading: false,
      status: accountStatus.AUTHENTICATED,
      login: account.login,
    }),
  },
  loadAccountRequested: {
    eventType: "loadAccountRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  accountLoaded: {
    eventType: "accountLoaded",
    payloadShape: {
      account: ow.optional.object.exactShape(accountShape),
    },
    handler: (state, { account }) => ({
      ...state,
      loading: false,
      login: account?.login,
      initialized: true,
    }),
  },
  accountAuthenticated: {
    eventType: "accountAuthenticated",
    payloadShape: {
      account: ow.object.exactShape(accountShape),
    },
    handler: (state, { account }) => ({
      ...state,
      loading: false,
      login: account?.login,
    }),
  },
  disconnectRequested: {
    eventType: "disconnectRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  disconnectSucceeded: {
    eventType: "disconnectSucceeded",
    handler: (state) => ({
      ...state,
      loading: false,
      status: accountStatus.ANONYMOUS,
      login: null,
    }),
  },
  loginFormRequested: {
    eventType: "loginFormRequested",
    handler: (state) => ({
      ...state,
      loginFormRequested: true,
    }),
    isNewCycle: true,
  },
  createAccountFormRequested: {
    eventType: "createAccountFormRequested",
    handler: (state) => ({
      ...state,
      loginFormRequested: false,
    }),
    isNewCycle: true,
  },
  persistAccountRequested: {
    eventType: "persistAccountRequested",
    payloadShape: { account: ow.object.exactShape(accountShape) },
  },
  retrievePersistedAccountRequested: {
    eventType: "retrievePersistedAccountRequested",
  },
  retrievePersistedAccountCompleted: {
    eventType: "retrievePersistedAccountCompleted",
    payloadShape: { account: ow.optional.object.exactShape(accountShape) },
  },
  deletePersistedAccountRequested: {
    eventType: "deletePersistedAccountRequested",
  },
  deletePersistedAccountCompleted: {
    eventType: "deletePersistedAccountCompleted",
  },
};
