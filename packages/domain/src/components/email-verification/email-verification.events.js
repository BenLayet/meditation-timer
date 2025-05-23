import ow from "ow";
import { emailVerificationStatus } from "../../models/email-verification.model.js";

export const emailVerificationEvents = {
  sendVerificationMailRequested: {
    eventType: "sendVerificationMailRequested",
    payloadShape: {
      email: ow.string,
    },
  },
  checkStatusRequested: {
    eventType: "checkStatusRequested",
    payloadShape: {
      email: ow.string,
    },
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  checkStatusCompleted: {
    eventType: "checkStatusCompleted",
    payloadShape: {
      status: ow.string.oneOf(Object.values(emailVerificationStatus)),
    },
    handler: (state, { status }) => ({
      ...state,
      loading: false,
      status,
    }),
  },
  sendVerificationMailScheduledTaskRequested: {
    eventType: "sendVerificationMailScheduledTaskRequested",
  },
  sendVerificationMailScheduledTaskTimeUp: {
    eventType: "sendVerificationMailScheduledTaskTimeUp",
  },
  checkStatusScheduledTaskRequested: {
    eventType: "checkStatusScheduledTaskRequested",
  },
  checkStatusScheduledTaskTimeUp: {
    eventType: "checkStatusScheduledTaskTimeUp",
    isNewCycle: true,
  },
  retryRequested: {
    eventType: "retryRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true,
  },
  refreshRequested: {
    eventType: "refreshRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true,
  },
  resetRequested: {
    eventType: "resetRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true,
  },
};
