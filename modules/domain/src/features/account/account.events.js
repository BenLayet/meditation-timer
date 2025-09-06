import { z } from "zod";
import { accountStatus, loginRegex } from "../../models/account.model.js";

const accountShape = z.object({
  login: z.string().regex(loginRegex),
  userToken: z.string().optional(),
});

export const accountEvents = {
  onlineStatusChanged: {
    eventType: "onlineStatusChanged",
    payloadShape: z.object({ isOnline: z.boolean() }),
    handler: (state, { isOnline }) => ({ ...state, isOnline }),
  },
  accountNewlyAuthenticated: {
    eventType: "accountNewlyAuthenticated",
    payloadShape: z.object({ account: accountShape }),
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
    payloadShape: z.object({ account: accountShape.optional() }),
    handler: (state, { account }) => ({
      ...state,
      loading: false,
      login: account?.login,
      initialized: true,
    }),
  },
  loadAccountCompleted: {
    eventType: "loadAccountCompleted",
  },
  accountAuthenticated: {
    eventType: "accountAuthenticated",
    payloadShape: z.object({ account: accountShape }),
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
    payloadShape: z.object({ account: accountShape }),
  },
  retrievePersistedAccountRequested: {
    eventType: "retrievePersistedAccountRequested",
  },
  retrievePersistedAccountCompleted: {
    eventType: "retrievePersistedAccountCompleted",
    payloadShape: z.object({ account: accountShape.optional() }),
  },
  deletePersistedAccountRequested: {
    eventType: "deletePersistedAccountRequested",
  },
  deletePersistedAccountCompleted: {
    eventType: "deletePersistedAccountCompleted",
  },
};
