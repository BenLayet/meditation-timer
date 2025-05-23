import ow from "ow";
import { emailVerificationStatus } from "../../models/email-verification.model.js";

export const emailVerificationEvents = {
  createEmailVerificationRequested: {
    eventType: "createEmailVerificationRequested",
    payloadShape: {
      email: ow.string.email,
    },
  },
  refreshEmailVerificationRequested: {
    eventType: "refreshEmailVerificationRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  refreshEmailVerificationCompleted: {
    eventType: "refreshEmailVerificationCompleted",
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
  refreshEmailVerificationScheduledTaskRequested: {
    eventType: "refreshEmailVerificationScheduledTaskRequested",
  },
  refreshEmailVerificationScheduledTaskCancelled: {
    eventType: "refreshEmailVerificationScheduledTaskCancelled",
  },
  refreshEmailVerificationScheduledTaskTimeUp: {
    eventType: "refreshEmailVerificationScheduledTaskTimeUp",
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
