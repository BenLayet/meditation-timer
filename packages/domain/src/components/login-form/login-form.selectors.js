import { flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { and, or } from "../../lib/functions/predicate.functions.js";
import { loginErrorCode } from "../../models/account.model.js";

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

const hasLoginNotFoundError = flow(
  postProcessingErrorCodes,
  containsErrorCode(loginErrorCode.LOGIN_NOT_FOUND),
);
//login
const loginInput = (state) => state.controls.login;
const loginInputValue = flow(loginInput, getInputValue);
const loginErrorCodes = flow(loginInput, getInputErrorCodes);
const isLoginInputMarkedAsError = or(
  flow(loginInput, (input) => input.areErrorsMarked && hasInputAnyError(input)),
  flow(
    postProcessingErrorCodes,
    containsErrorCode(loginErrorCode.LOGIN_NOT_FOUND),
  ),
);
const isLoginInputDisabled = isProcessing;
const hasLoginFormatError = and(
  isLoginInputMarkedAsError,
  flow(loginErrorCodes, containsErrorCode(loginErrorCode.INVALID_LOGIN_FORMAT)),
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
    containsErrorCode(loginErrorCode.INVALID_PASSWORD_FORMAT),
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
  containsErrorCode(loginErrorCode.SERVER_UNREACHABLE),
);
const visibleErrorCodes = [
  loginErrorCode.INVALID_LOGIN_FORMAT,
  loginErrorCode.LOGIN_NOT_FOUND,
  loginErrorCode.INVALID_PASSWORD_FORMAT,
  loginErrorCode.SERVER_UNREACHABLE,
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
  hasLoginNotFoundError,
  hasServerUnreachableError,
  areErrorsVisible,
  isLoginInputMarkedAsError,
  isPasswordInputMarkedAsError,
  isSubmitDisabled,
  loginInputValue,
  passwordInputValue,
};

const ownState = (compositeState) => compositeState.ownState;

export const loginFormSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
