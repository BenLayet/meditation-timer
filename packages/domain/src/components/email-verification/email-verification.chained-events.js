import { emailVerificationEvents } from "./email-verification.events.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.checkIfEmailVerifiedCompleted,
    onCondition: ({ state }) => state.ownState.status === "NOT_REQUESTED",
    thenDispatch:
      emailVerificationEvents.sendVerificationMailScheduledTaskRequested,
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
    onEvent: emailVerificationEvents.sendVerificationMailScheduledTaskTimeUp,
    thenDispatch: emailVerificationEvents.sendVerificationMailRequested,
  },
  {
    onEvent: emailVerificationEvents.resetRequested,
    thenDispatch:
      emailVerificationEvents.sendVerificationMailScheduledTaskCancelled,
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
    thenDispatch: emailVerificationEvents.sendVerificationMailRequested,
  },
];
