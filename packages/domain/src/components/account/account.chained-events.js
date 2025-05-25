import { emailVerificationEvents } from "../email-verification/email-verification.events.js";
import { accountEvents } from "./account.events.js";
import { accountStatus } from "./account.state.js";

export const accountChainedEvents = [
  {
    onEvent: accountEvents.accountCreated,
    thenDispatch: {
      ...emailVerificationEvents.verificationRequested,
      childComponentPath: ["emailVerification"],
    },
  },
  {
    onEvent: accountEvents.accountLoaded,
    onCondition: ({ state }) =>
      state.ownState.status === accountStatus.PENDING_VERIFICATION,
    thenDispatch: {
      ...emailVerificationEvents.loadStatusRequested,
      childComponentPath: ["emailVerification"],
    },
  },
  {
    onEvent: {
      ...emailVerificationEvents.verificationSucceeded,
      childComponentPath: ["emailVerification"],
    },
    thenDispatch: accountEvents.accountAuthenticated,
  },
  {
    onEvent: {
      ...emailVerificationEvents.resetRequested,
      childComponentPath: ["emailVerification"],
    },
    thenDispatch: accountEvents.disconnectRequested,
  },
];
