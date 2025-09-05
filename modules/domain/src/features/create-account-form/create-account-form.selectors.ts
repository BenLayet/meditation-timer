import { flow } from "lodash-es";
import { map } from "@softersoftware/functions/object.functions.js";
import { and, or } from "@softersoftware/functions/predicate.functions.js";
import { createAccountErrorCodes } from "../../models/account.model.js";

//utility
const getInputErrorCodes = (input) => input.errorCodes ?? [];
const getInputValue = (input) => input.value ?? "";
const hasInputAnyError = flow(
  getInputErrorCodes,
  (errorCodes) => errorCodes.length > 0,
);
const containsErrorCode = (errorCode) => (errorCodes) =>
  errorCodes.includes(errorCode);

//form part1
const isProcessing = (state) => state.isSubmitted;
const postProcessingErrorCodes = (state) => state.postProcessingErrorCodes;

const hasLoginAlreadyExistsError = flow(
  postProcessingErrorCodes,
  containsErrorCode(createAccountErrorCodes.LOGIN_ALREADY_EXISTS),
);
//login
const loginInput = (state) => state.controls.login;
const loginInputValue = flow(loginInput, getInputValue);
const loginInputErrorCodes = flow(loginInput, getInputErrorCodes);
const isLoginInputMarkedAsError = or(
  flow(loginInput, (input) => input.areErrorsMarked && hasInputAnyError(input)),
  flow(
    postProcessingErrorCodes,
    containsErrorCode(createAccountErrorCodes.LOGIN_ALREADY_EXISTS),
  ),
);
const isLoginInputDisabled = isProcessing;
const hasLoginFormatError = and(
  isLoginInputMarkedAsError,
  flow(
    loginInputErrorCodes,
    containsErrorCode(createAccountErrorCodes.INVALID_LOGIN_FORMAT),
  ),
);

//password
const passwordInput = (state) => state.controls.password;
const passwordInputValue = flow(passwordInput, getInputValue);
const passwordInputErrorCodes = flow(passwordInput, getInputErrorCodes);
const isPasswordInputMarkedAsError = flow(
  passwordInput,
  (input) => input.areErrorsMarked && hasInputAnyError(input),
);
const isPasswordInputDisabled = isProcessing;
const hasPasswordFormatError = and(
  isPasswordInputMarkedAsError,
  flow(
    passwordInputErrorCodes,
    containsErrorCode(createAccountErrorCodes.INVALID_PASSWORD_FORMAT),
  ),
);

//form
const errorCodes = (state) => [
  ...loginInputErrorCodes(state),
  ...passwordInputErrorCodes(state),
  ...postProcessingErrorCodes(state),
];
const hasServerUnreachableError = flow(
  postProcessingErrorCodes,
  containsErrorCode(createAccountErrorCodes.SERVER_UNREACHABLE),
);
const visibleErrorCodes = [
  createAccountErrorCodes.INVALID_LOGIN_FORMAT,
  createAccountErrorCodes.LOGIN_ALREADY_EXISTS,
  createAccountErrorCodes.INVALID_PASSWORD_FORMAT,
  createAccountErrorCodes.SERVER_UNREACHABLE,
];
const areErrorsVisible = flow(errorCodes, (errorCodes) =>
  errorCodes.some((errorCode) => visibleErrorCodes.includes(errorCode)),
);
const hasAnyError = flow(errorCodes, (errorCodes) => errorCodes.length > 0);
const isSubmitDisabled = or(hasAnyError, isProcessing);

export const ownStateSelectors = {
  isProcessing,
  isLoginInputDisabled,
  isPasswordInputDisabled,
  hasLoginFormatError,
  hasPasswordFormatError,
  hasLoginAlreadyExistsError,
  hasServerUnreachableError,
  areErrorsVisible,
  isLoginInputMarkedAsError,
  isPasswordInputMarkedAsError,
  isSubmitDisabled,
  loginInputValue,
  passwordInputValue,
};

const ownState = (compositeState) => compositeState.ownState;

export const createAccountFormSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
