import { ACCOUNT_INITIAL_STATE } from "./account.state.js";
import { accountSelectors } from "./account.selectors.js";
import { accountEvents } from "./account.events.js";
import { accountChainedEvents } from "./account.chained-events.js";
import { emailVerificationComponent } from "../email-verification/email-verification.component.js";

export const accountComponent = {
  initialState: ACCOUNT_INITIAL_STATE,
  events: accountEvents,
  selectors: accountSelectors,
  chainedEvents: accountChainedEvents,
  children: { emailVerification: emailVerificationComponent },
};
