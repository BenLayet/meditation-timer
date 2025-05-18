
import { EMAIL_VERIFICATION_INITIAL_STATE } from "./email-verification.state.js";
import { emailVerificationSelectors } from "./email-verification.selectors.js";
import { emailVerificationEvents } from "./email-verification.events.js";
import { emailVerificationChainedEvents } from "./email-verification.chained-events.js";

export const emailVerificationComponent = {
    initialState: EMAIL_VERIFICATION_INITIAL_STATE,
    events: emailVerificationEvents,
    selectors: emailVerificationSelectors,
    chainedEvents: emailVerificationChainedEvents,
};