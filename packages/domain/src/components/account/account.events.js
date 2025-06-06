import ow from "ow";
import { accountStatus } from "../../models/account.model.js";
import { emailRegex } from "../../models/email.validator.js";

export const accountEvents = {
  createAccountRequested: {
    eventType: "createAccountRequested",
    payloadShape: {
      email: ow.string.email,
    },
    handler: (state, { email }) => ({
      ...state,
      email,
      loading: true,
    }),
    isNewCycle: true,
  },
  accountCreated: {
    eventType: "accountCreated",
    payloadShape: {
      email: ow.string.matches(emailRegex),
    },
    handler: (state) => ({
      ...state,
      loading: false,
      status: accountStatus.PENDING_VERIFICATION,
    }),
  },
  accountAuthenticated: {
    eventType: "accountAuthenticated",
    payloadShape: {
      userToken: ow.string,
    },
    handler: (state) => ({
      ...state,
      loading: false,
      status: accountStatus.AUTHENTICATED,
    }),
  },
  createAccountCancelled: {
    eventType: "createAccountCancelled",
    handler: (state) => ({
      ...state,
      status: accountStatus.ANONYMOUS,
      email: null,
    }),
    isNewCycle: true,
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
        email: ow.string.matches(emailRegex),
        status: ow.string.oneOf(Object.values(accountStatus)),
        userToken: ow.optional.string,
      }),
    },
    handler: (state, { account }) => ({
      ...state,
      loading: false,
      email: account?.email,
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
};
