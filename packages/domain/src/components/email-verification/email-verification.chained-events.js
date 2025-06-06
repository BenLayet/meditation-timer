import { emailVerificationEvents } from "./email-verification.events.js";
import { emailVerificationStatus } from "../../models/email-verification.model.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.verificationRequested,
    thenDispatch: emailVerificationEvents.createRequested,
  },
  {
    onEvent: emailVerificationEvents.createSucceeded,
    thenDispatch: emailVerificationEvents.verificationLinkRequested,
  },
  {
    onEvent: emailVerificationEvents.verificationAvailableDetected,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.CREATED,
    thenDispatch: emailVerificationEvents.verificationLinkRequested,
  },
  {
    onEvent: emailVerificationEvents.statusLoaded,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.CREATED,
    thenDispatch: emailVerificationEvents.verificationLinkRequested,
  },
  {
    onEvent: emailVerificationEvents.statusLoaded,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.VERIFICATION_LINK_SENT,
    thenDispatch: emailVerificationEvents.refreshRequested,
  },
  {
    onEvent: emailVerificationEvents.verificationLinkSent,
    thenDispatch: emailVerificationEvents.scheduleRefreshRequested,
  },
  {
    onEvent: emailVerificationEvents.refreshCompleted,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.VERIFICATION_LINK_SENT,
    thenDispatch: emailVerificationEvents.scheduleRefreshRequested,
  },
  {
    onEvent: emailVerificationEvents.refreshCompleted,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.VERIFIED,
    thenDispatch: emailVerificationEvents.verificationSucceeded,
  },
  {
    onEvent: emailVerificationEvents.refreshCompleted,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.EXPIRED,
    thenDispatch: emailVerificationEvents.verificationFailed,
  },
  {
    onEvent: emailVerificationEvents.resetRequested,
    thenDispatch: emailVerificationEvents.cancelScheduledRefreshRequested,
  },
  {
    onEvent: emailVerificationEvents.refreshTimeUp,
    thenDispatch: emailVerificationEvents.refreshRequested,
  },
];
