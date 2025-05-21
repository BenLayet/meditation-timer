import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { emailVerificationStatus } from "../../models/email-verification.model.js";
import { or, not, and } from "../../lib/functions/predicate.functions.js";

const isPending = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.NOT_REQUESTED;
const isSent = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.REQUESTED;
const isExpired = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.EXPIRED;
const isVerified = (emailVerificationState) =>
  emailVerificationState.status === emailVerificationStatus.VERIFIED;
const isLoading = (emailVerificationState) => emailVerificationState.loading;
const isRefreshable = and(not(isLoading), isSent);
const isRetryable = and(not(isLoading), isPending);
const isResettable = () => true;

export const ownStateSelectors = {
  isVerified,
  isLoading,
  isPending,
  isSent,
  isExpired,
  isRefreshable,
  isResettable,
  isRetryable,
};

const ownState = (compositeState) => compositeState.ownState;

export const emailVerificationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
