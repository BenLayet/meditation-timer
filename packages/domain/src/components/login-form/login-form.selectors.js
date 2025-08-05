import { flow, isEmpty } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { and, or } from "../../lib/functions/predicate.functions.js";
import { loginFormErrorCode } from "../../models/account.model.js";

const isLoading = (state) => state.loading;
const loginInputValue = (state) => (state.loginInputValue ?? "").trim();
const isLoginMissing = flow(loginInputValue, isEmpty);
const errorCodes = (state) => state.errorCodes;
const containsErrorCode = (errorCode) => (errorCodes) =>
  errorCodes.includes(errorCode);
const hasLoginNotFoundError = flow(
  errorCodes,
  containsErrorCode(loginFormErrorCode.LOGIN_NOT_FOUND),
);
const hasLoginFormatError = flow(
  errorCodes,
  containsErrorCode(loginFormErrorCode.INVALID_LOGIN_FORMAT),
);
const hasAnyLoginInputError = or(
  hasLoginNotFoundError,
  hasLoginFormatError,
  isLoginMissing,
);
const hasAnyError = hasAnyLoginInputError;

const isValidationRequested = (state) => state.isValidationRequested;
const areErrorsVisible = and(isValidationRequested, hasAnyError);
const isLoginInputMarkedAsError = and(areErrorsVisible, hasAnyLoginInputError);
const isSubmitDisabled = or(hasAnyError, isLoading);
const isLoginInputDisabled = isLoading;

export const ownStateSelectors = {
  isLoading,
  isLoginInputDisabled,
  hasLoginFormatError,
  hasLoginNotFoundError,
  isLoginMissing,
  areErrorsVisible,
  isLoginInputMarkedAsError,
  isSubmitDisabled,
};

const ownState = (compositeState) => compositeState.ownState;

export const loginFormSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
