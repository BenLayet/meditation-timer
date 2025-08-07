import { flow, isEmpty } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { and, or } from "../../lib/functions/predicate.functions.js";
import {
  createAccountErrorCode,
  loginErrorCode,
} from "../../models/account.model.js";

const isLoading = (state) => state.loading;
const loginInputValue = (state) => (state.loginInputValue ?? "").trim();
const isLoginMissing = flow(loginInputValue, isEmpty);
const errorCodes = (state) => state.errorCodes;
const containsErrorCode = (errorCode) => (errorCodes) =>
  errorCodes.includes(errorCode);
const hasLoginAlreadyExistsError = flow(
  errorCodes,
  containsErrorCode(createAccountErrorCode.LOGIN_ALREADY_EXISTS),
);
const hasLoginFormatError = flow(
  errorCodes,
  containsErrorCode(createAccountErrorCode.INVALID_LOGIN_FORMAT),
);
const hasAnyLoginInputError = or(
  hasLoginAlreadyExistsError,
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
  hasLoginAlreadyExistsError,
  isLoginMissing,
  areErrorsVisible,
  isLoginInputMarkedAsError,
  isSubmitDisabled,
  loginInputValue,
};

const ownState = (compositeState) => compositeState.ownState;

export const createAccountFormSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
