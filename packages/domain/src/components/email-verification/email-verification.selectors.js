import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { emailVerificationStatus } from "../../models/email-verification.model.js";
import { or, not, and } from "../../lib/functions/predicate.functions.js";

const isVerificationLinkSent = (emailVerificationState) =>
  emailVerificationState.status ===
  emailVerificationStatus.VERIFICATION_LINK_SENT;
const isExpired = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.EXPIRED;
const isVerified = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.VERIFIED;
const isLoading = (emailVerificationState) => emailVerificationState.loading;
const isPendingConnection = and(not(isLoading), not(isVerificationLinkSent));
const isRefreshable = and(not(isLoading), isVerificationLinkSent);
const canVerificationLinkBeRequested = and(
  not(isLoading),
  not(isVerificationLinkSent),
);
const isResettable = () => true;

export const ownStateSelectors = {
  isLoading,
  isPendingConnection,
  isVerificationLinkSent,
  isVerified,
  isExpired,
  isResettable,
  isRefreshable,
  canVerificationLinkBeRequested,
};

const ownState = (compositeState) => compositeState.ownState;

export const emailVerificationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
