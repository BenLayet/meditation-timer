import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { emailVerificationStatus } from "../../models/email-verification.model.js";
import { or, not, and } from "../../lib/functions/predicate.functions.js";

const isActivationLinkSent = (emailVerificationState) =>
  emailVerificationState.status ===
  emailVerificationStatus.ACTIVATION_LINK_SENT;
const isExpired = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.EXPIRED;
const isVerified = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.VERIFIED;
const isLoading = (emailVerificationState) => emailVerificationState.loading;
const isPendingConnection = and(not(isLoading), not(isActivationLinkSent));
const isRefreshable = and(not(isLoading), isActivationLinkSent);
const canActivationLinkBeRequested = and(
  not(isLoading),
  not(isActivationLinkSent),
);
const isResettable = () => true;

export const ownStateSelectors = {
  isLoading,
  isPendingConnection,
  isActivationLinkSent,
  isVerified,
  isExpired,
  isResettable,
  isRefreshable,
  canActivationLinkBeRequested,
};

const ownState = (compositeState) => compositeState.ownState;

export const emailVerificationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
