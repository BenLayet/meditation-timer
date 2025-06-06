import ow from "ow";
import { emailVerificationStatus } from "../../models/email-verification.model.js";
import { emailRegex } from "../../models/email.validator.js";

export const emailVerificationEvents = {
  verificationRequested: {
    eventType: "verificationRequested",
    payloadShape: {
      email: ow.string.matches(emailRegex),
    },
  },
  verificationSucceeded: {
    eventType: "verificationSucceeded",
    payloadShape: {
      userToken: ow.string,
    },
  },
  verificationFailed: {
    eventType: "verificationFailed",
  },
  loadStatusRequested: {
    eventType: "loadStatusRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  statusLoaded: {
    eventType: "statusLoaded",
    payloadShape: {
      status: ow.string.oneOf(Object.values(emailVerificationStatus)),
    },
    handler: (state, { status }) => ({
      ...state,
      loading: false,
      status,
    }),
  },
  createRequested: {
    eventType: "createRequested",
    payloadShape: {
      email: ow.string.matches(emailRegex),
    },
    handler: (state) => ({
      ...state,
      loading: true,
    }),
  },
  createSucceeded: {
    eventType: "createSucceeded",
    handler: (state) => ({
      ...state,
      loading: false,
      status: emailVerificationStatus.CREATED,
    }),
  },
  verificationLinkRequested: {
    eventType: "verificationLinkRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true, // can be triggered manually or automatically
  },
  verificationLinkSent: {
    eventType: "verificationLinkSent",
    handler: (state) => ({
      ...state,
      loading: false,
      status: emailVerificationStatus.VERIFICATION_LINK_SENT,
    }),
  },
  verificationLinkFailed: {
    eventType: "verificationLinkFailed",
    handler: (state) => ({
      ...state,
      loading: false,
    }),
  },
  verificationAvailableDetected: {
    eventType: "verificationAvailableDetected",
  },
  scheduleRefreshRequested: {
    eventType: "scheduleRefreshRequested",
  },
  cancelScheduledRefreshRequested: {
    eventType: "cancelScheduledRefreshRequested",
  },
  refreshTimeUp: {
    eventType: "refreshTimeUp",
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
  refreshCompleted: {
    eventType: "refreshCompleted",
    payloadShape: {
      status: ow.string.oneOf(Object.values(emailVerificationStatus)),
      userToken: ow.optional.string,
    },
    handler: (state, { status }) => ({
      ...state,
      loading: false,
      status,
    }),
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
