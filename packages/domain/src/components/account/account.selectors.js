import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { accountStatus } from "./account.state.js";
import { and, not } from "../../lib/functions/predicate.functions.js";

const email = (accountState) => accountState.email;
const isPendingVerification = (accountState) =>
  accountState.status === accountStatus.PENDING_VERIFICATION;
const canAccountCreationBeCancelled = isPendingVerification;
const isAnonymous = (accountState) =>
  accountState.status === accountStatus.ANONYMOUS;
const isAuthenticated = (accountState) =>
  accountState.status === accountStatus.AUTHENTICATED;
const isLoading = (accountState) => accountState.loading;
const canCreateAccount = and(not(isLoading), isAnonymous);
const canDisconnect = isAuthenticated;
const isEmailVisible = and(not(isAnonymous), not(isLoading));

export const ownStateSelectors = {
  isAnonymous,
  isPendingVerification,
  isAuthenticated,
  email,
  isLoading,
  canAccountCreationBeCancelled,
  canCreateAccount,
  canDisconnect,
  isEmailVisible,
};

const ownState = (compositeState) => compositeState.ownState;

export const accountSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
