import ow from "ow";
import { accountStatus } from "./account.state.js";

export const accountEvents = {
  createAccountRequested: {
    eventType: "createAccountRequested",
    payloadShape: {
      email: ow.string.email,
    },
    handler: (state, { email }) => ({
      ...state,
      email,
      status: accountStatus.PENDING_VERIFICATION,
    }),
    isNewCycle: true,
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
      email: ow.optional.string.email,
      status: ow.string.oneOf(Object.values(accountStatus)),
    },
    handler: (state, { email, status }) => ({
      ...state,
      loading: false,
      email,
      status,
    }),
  },
  checkEmailVerificationStatusRequested: {
    eventType: "checkEmailVerificationStatusRequested",
    payloadShape: {
      email: ow.string.email,
    },
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  checkEmailVerificationStatusCompleted: {
    eventType: "checkEmailVerificationStatusCompleted",
    payloadShape: {
      isVerified: ow.boolean,
    },
    handler: (state, { isVerified }) => ({
      ...state,
      loading: false,
      status: isVerified ? accountStatus.AUTHENTICATED : state.status,
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
