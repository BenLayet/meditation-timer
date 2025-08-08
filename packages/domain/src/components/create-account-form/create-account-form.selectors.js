import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { and, or } from "../../lib/functions/predicate.functions.js";
import { createAccountErrorCode } from "../../models/account.model.js";

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
  containsErrorCode(createAccountErrorCode.LOGIN_ALREADY_EXISTS),
);
//login
const loginInput = (state) => state.controls.login;
const loginInputValue = flow(loginInput, getInputValue);
const loginErrorCodes = flow(loginInput, getInputErrorCodes);
const isLoginInputMarkedAsError = or(
  flow(loginInput, (input) => input.areErrorsMarked && hasInputAnyError(input)),
  flow(
    postProcessingErrorCodes,
    containsErrorCode(createAccountErrorCode.LOGIN_ALREADY_EXISTS),
  ),
);
const isLoginInputDisabled = isProcessing;
const hasLoginFormatError = and(
  isLoginInputMarkedAsError,
  flow(
    loginErrorCodes,
    containsErrorCode(createAccountErrorCode.INVALID_LOGIN_FORMAT),
  ),
);

//password
const passwordInput = (state) => state.controls.password;
const passwordInputValue = flow(passwordInput, getInputValue);
const passwordErrorCodes = flow(passwordInput, getInputErrorCodes);
const isPasswordInputMarkedAsError = flow(
  passwordInput,
  (input) => input.areErrorsMarked && hasInputAnyError(input),
);
const isPasswordInputDisabled = isProcessing;
const hasPasswordFormatError = and(
  isPasswordInputMarkedAsError,
  flow(
    passwordErrorCodes,
    containsErrorCode(createAccountErrorCode.INVALID_PASSWORD_FORMAT),
  ),
);

//form
const errorCodes = (state) => [
  ...loginErrorCodes(state),
  ...passwordErrorCodes(state),
  ...postProcessingErrorCodes(state),
];
const hasServerUnreachableError = flow(
  postProcessingErrorCodes,
  containsErrorCode(createAccountErrorCode.SERVER_UNREACHABLE),
);
const visibleErrorCodes = [
  createAccountErrorCode.INVALID_LOGIN_FORMAT,
  createAccountErrorCode.LOGIN_ALREADY_EXISTS,
  createAccountErrorCode.INVALID_PASSWORD_FORMAT,
  createAccountErrorCode.SERVER_UNREACHABLE,
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
