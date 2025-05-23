import { emailVerificationEvents } from "./email-verification.events.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.refreshEmailVerificationCompleted,
    onCondition: ({ state }) => state.ownState.status === "NOT_REQUESTED",
    thenDispatch:
      emailVerificationEvents.createEmailVerificationScheduledTaskRequested,
    withPayload: ({ state }) => ({
      email: state.ownState.email,
    }),
  },
  {
    onEvent: emailVerificationEvents.refreshEmailVerificationCompleted,
    onCondition: ({ state }) => state.ownState.status === "REQUESTED",
    thenDispatch:
      emailVerificationEvents.refreshEmailVerificationScheduledTaskRequested,
  },
  {
    onEvent: emailVerificationEvents.createEmailVerificationScheduledTaskTimeUp,
    thenDispatch: emailVerificationEvents.createEmailVerificationRequested,
  },
  {
    onEvent: emailVerificationEvents.resetRequested,
    thenDispatch:
      emailVerificationEvents.createEmailVerificationScheduledTaskCancelled,
  },
  {
    onEvent: emailVerificationEvents.resetRequested,
    thenDispatch:
      emailVerificationEvents.refreshEmailVerificationScheduledTaskCancelled,
  },
  {
    onEvent:
      emailVerificationEvents.refreshEmailVerificationScheduledTaskTimeUp,
    thenDispatch: emailVerificationEvents.refreshEmailVerificationRequested,
  },
  {
    onEvent: emailVerificationEvents.retryRequested,
    thenDispatch: emailVerificationEvents.createEmailVerificationRequested,
  },
];
