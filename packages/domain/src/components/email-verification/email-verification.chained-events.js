import { emailVerificationEvents } from "./email-verification.events.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.checkStatusCompleted,
    onCondition: ({ state }) => state.ownState.status === "NOT_REQUESTED",
    thenDispatch:
      emailVerificationEvents.sendVerificationMailScheduledTaskRequested,
    withPayload: ({ state }) => ({
      email: state.ownState.email,
    }),
  },
  {
    onEvent: emailVerificationEvents.checkStatusCompleted,
    onCondition: ({ state }) => state.ownState.status === "REQUESTED",
    thenDispatch: emailVerificationEvents.checkStatusScheduledTaskRequested,
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
    thenDispatch: emailVerificationEvents.checkStatusScheduledTaskCancelled,
  },
  {
    onEvent: emailVerificationEvents.checkStatusScheduledTaskTimeUp,
    thenDispatch: emailVerificationEvents.checkStatusRequested,
  },
  {
    onEvent: emailVerificationEvents.retryRequested,
    thenDispatch: emailVerificationEvents.sendVerificationMailRequested,
  },
];
