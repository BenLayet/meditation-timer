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
  activationLinkRequested: {
    eventType: "activationLinkRequested",
    handler: (state) => ({
      ...state,
      loading: true,
    }),
    isNewCycle: true, // can be triggered manually or automatically
  },
  activationLinkSent: {
    eventType: "activationLinkSent",
    handler: (state) => ({
      ...state,
      loading: false,
      status: emailVerificationStatus.ACTIVATION_LINK_SENT,
    }),
  },
  activationLinkFailed: {
    eventType: "activationLinkFailed",
    handler: (state) => ({
      ...state,
      loading: false,
    }),
  },
  onlineDetected: {
    eventType: "onlineDetected",
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
