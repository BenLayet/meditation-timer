import { emailVerificationEvents } from "../email-verification/email-verification.events.js";
import { accountEvents } from "./account.events.js";
import { ownStateSelectors } from "./account.selectors.js";
import { ownStateSelectors as emailVerificationOwnSelectors } from "../email-verification/email-verification.selectors.js";

export const accountChainedEvents = [
  {
    onEvent: accountEvents.createAccountRequested,
    thenDispatch: {
      ...emailVerificationEvents.sendVerificationMailRequested,
      childComponentPath: ["emailVerification"],
    },
  },
  {
    onEvent: accountEvents.accountLoaded,
    onCondition: ({ state }) =>
      ownStateSelectors.isPendingVerification(state.ownState),
    thenDispatch: accountEvents.checkEmailVerificationStatusRequested,
  },
  {
    onEvent: accountEvents.checkEmailVerificationStatusRequested,
    thenDispatch: {
      ...emailVerificationEvents.checkIfEmailVerifiedRequested,
      childComponentPath: ["emailVerification"],
    },
  },
  {
    onEvent: {
      ...emailVerificationEvents.checkIfEmailVerifiedCompleted,
      childComponentPath: ["emailVerification"],
    },
    thenDispatch: accountEvents.checkEmailVerificationStatusCompleted,
    withPayload: ({ state }) => ({
      isVerified: emailVerificationOwnSelectors.isVerified(
        state.children.emailVerification.ownState,
      ),
    }),
  },
  {
    onEvent: {
      ...emailVerificationEvents.resetRequested,
      childComponentPath: ["emailVerification"],
    },
    thenDispatch: accountEvents.logOutRequested,
  },
  {
    onEvent: {
      ...emailVerificationEvents.refreshRequested,
      childComponentPath: ["emailVerification"],
    },
    thenDispatch: accountEvents.loadAccountRequested,
  },
];
