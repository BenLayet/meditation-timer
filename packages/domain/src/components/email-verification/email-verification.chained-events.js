import { emailVerificationEvents } from "./email-verification.events.js";
import { emailVerificationStatus } from "../../models/email-verification.model.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.verificationRequested,
    thenDispatch: emailVerificationEvents.createRequested,
  },
  {
    onEvent: emailVerificationEvents.createSucceeded,
    thenDispatch: emailVerificationEvents.activationLinkRequested,
  },
  {
    onEvent: emailVerificationEvents.onlineDetected,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.CREATED,
    thenDispatch: emailVerificationEvents.activationLinkRequested,
  },
  {
    onEvent: emailVerificationEvents.statusLoaded,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.CREATED,
    thenDispatch: emailVerificationEvents.activationLinkRequested,
  },
  {
    onEvent: emailVerificationEvents.statusLoaded,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.ACTIVATION_LINK_SENT,
    thenDispatch: emailVerificationEvents.refreshRequested,
  },
  {
    onEvent: emailVerificationEvents.activationLinkSent,
    thenDispatch: emailVerificationEvents.scheduleRefreshRequested,
  },
  {
    onEvent: emailVerificationEvents.refreshCompleted,
    onCondition: ({ state }) =>
      state.ownState.status === emailVerificationStatus.ACTIVATION_LINK_SENT,
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
];
