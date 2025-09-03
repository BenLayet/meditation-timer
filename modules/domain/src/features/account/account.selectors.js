import { flow } from "lodash-es";
import { map } from "@softer-software/functions/object.functions.js";
import { accountStatus } from "../../models/account.model.js";
import { and, not } from "@softer-software/functions/predicate.functions.js";

const login = (accountState) => accountState.login;
const isAnonymous = flow(login, (login) => !login);
const isAuthenticated = not(isAnonymous);
const isLoading = (accountState) => accountState.loading;
const isOnline = (accountState) => accountState.isOnline;
const isAuthenticationPossible = and(not(isLoading), isAnonymous, isOnline);
const isLoginFormRequested = (accountState) => accountState.loginFormRequested;
const isCreateAccountFormVisible = and(
  isAuthenticationPossible,
  not(isLoginFormRequested),
);
const isLoginFormVisible = and(isAuthenticationPossible, isLoginFormRequested);
const canDisconnect = isAuthenticated;
const isLoginVisible = and(not(isAnonymous), not(isLoading));
const isConnectionRequired = and(not(isLoading), isAnonymous, not(isOnline));
const isInitialized = (accountState) => accountState.initialized;
export const ownStateSelectors = {
  isLoading,
  isAnonymous,
  isConnectionRequired,
  isAuthenticationPossible,
  isLoginFormVisible,
  isCreateAccountFormVisible,
  isAuthenticated,
  isLoginVisible,
  login,
  canDisconnect,
  isInitialized,
};

const ownState = (compositeState) => compositeState.ownState;

export const accountSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
