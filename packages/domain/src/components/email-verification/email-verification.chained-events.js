import { emailVerificationEvents } from "./email-verification.events.js";

export const emailVerificationChainedEvents = [
  {
    onEvent: emailVerificationEvents.checkStatusCompleted,
    onCondition: (state) => state.status === "NOT_REQUESTED",
    thenDispatch:
      emailVerificationEvents.sendVerificationMailScheduledTaskRequested,
  },
  {
    onEvent: emailVerificationEvents.checkStatusCompleted,
    onCondition: (state) => state.status === "REQUESTED",
    thenDispatch: emailVerificationEvents.checkStatusScheduledTaskRequested,
  },
  {
    onEvent: emailVerificationEvents.sendVerificationMailScheduledTaskTimeUp,
    thenDispatch: emailVerificationEvents.sendVerificationMailRequested,
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
