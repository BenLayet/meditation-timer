import ow from "ow";
import { accountStatus, loginRegex } from "../../models/account.model.js";

export const accountEvents = {
  onlineStatusChanged: {
    eventType: "onlineStatusChanged",
    payloadShape: { isOnline: ow.boolean },
    handler: (state, { isOnline }) => ({ ...state, isOnline }),
  },
  accountAuthenticated: {
    eventType: "accountAuthenticated",
    payloadShape: {
      userToken: ow.string,
    },
    handler: (state, { login }) => ({
      ...state,
      loading: false,
      status: accountStatus.AUTHENTICATED,
      login,
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
      account: ow.optional.object.exactShape({
        login: ow.string.matches(loginRegex),
        status: ow.string.oneOf(Object.values(accountStatus)),
        userToken: ow.optional.string,
      }),
    },
    handler: (state, { account }) => ({
      ...state,
      loading: false,
      login: account?.login,
      status: account?.status ?? accountStatus.ANONYMOUS,
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
      email: null,
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
};
