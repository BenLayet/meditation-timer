import ow from "ow";
import { emailVerificationStatus } from "../../models/email-verification.model.js";

export const emailVerificationEvents = {
  createEmailVerificationRequested: {
    eventType: "createEmailVerificationRequested",
    payloadShape: {
      email: ow.string.email,
    },
  },
  checkIfEmailVerifiedRequested: {
    eventType: "checkIfEmailVerifiedRequested",
    payloadShape: {
      email: ow.string.email,
    },
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  checkIfEmailVerifiedCompleted: {
    eventType: "checkIfEmailVerifiedCompleted",
    payloadShape: {
      status: ow.string.oneOf(Object.values(emailVerificationStatus)),
    },
    handler: (state, { status }) => ({
      ...state,
      loading: false,
      status,
    }),
  },
  createEmailVerificationScheduledTaskRequested: {
    eventType: "createEmailVerificationScheduledTaskRequested",
  },
  createEmailVerificationScheduledTaskCancelled: {
    eventType: "createEmailVerificationScheduledTaskCancelled",
  },
  createEmailVerificationScheduledTaskTimeUp: {
    eventType: "createEmailVerificationScheduledTaskTimeUp",
  },
  checkIfEmailVerifiedScheduledTaskRequested: {
    eventType: "checkIfEmailVerifiedScheduledTaskRequested",
  },
  checkIfEmailVerifiedScheduledTaskCancelled: {
    eventType: "checkIfEmailVerifiedScheduledTaskCancelled",
  },
  checkIfEmailVerifiedScheduledTaskTimeUp: {
    eventType: "checkIfEmailVerifiedScheduledTaskTimeUp",
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
