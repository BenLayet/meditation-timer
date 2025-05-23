import { emailVerificationEvents } from "./email-verification.events.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.checkIfEmailVerifiedCompleted,
    onCondition: ({ state }) => state.ownState.status === "NOT_REQUESTED",
    thenDispatch:
      emailVerificationEvents.createEmailVerificationScheduledTaskRequested,
    withPayload: ({ state }) => ({
      email: state.ownState.email,
    }),
  },
  {
    onEvent: emailVerificationEvents.checkIfEmailVerifiedCompleted,
    onCondition: ({ state }) => state.ownState.status === "REQUESTED",
    thenDispatch:
      emailVerificationEvents.checkIfEmailVerifiedScheduledTaskRequested,
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
      emailVerificationEvents.checkIfEmailVerifiedScheduledTaskCancelled,
  },
  {
    onEvent: emailVerificationEvents.checkIfEmailVerifiedScheduledTaskTimeUp,
    thenDispatch: emailVerificationEvents.checkIfEmailVerifiedRequested,
  },
  {
    onEvent: emailVerificationEvents.retryRequested,
    thenDispatch: emailVerificationEvents.createEmailVerificationRequested,
  },
];
