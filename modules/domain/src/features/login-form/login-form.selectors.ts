import { flow } from "lodash-es";
import { map } from "@softersoftware/functions/object.functions.js";
import { and, or } from "@softersoftware/functions/predicate.functions.js";
import { loginErrorCodes } from "../../models/account.model.js";

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
  containsErrorCode(loginErrorCodes.LOGIN_NOT_FOUND),
);
const hasIncorrectPasswordError = flow(
  postProcessingErrorCodes,
  containsErrorCode(loginErrorCodes.INCORRECT_PASSWORD),
);
//login
const loginInput = (state) => state.controls.login;
const loginInputValue = flow(loginInput, getInputValue);
const loginInputErrorCodes = flow(loginInput, getInputErrorCodes);
const isLoginInputMarkedAsError = or(
  flow(
    loginInputErrorCodes,
    (input) => input.areErrorsMarked && hasInputAnyError(input),
  ),
  flow(
    postProcessingErrorCodes,
    containsErrorCode(loginErrorCodes.LOGIN_NOT_FOUND),
  ),
);
const isLoginInputDisabled = isProcessing;
const hasLoginFormatError = and(
  isLoginInputMarkedAsError,
  flow(
    loginInputErrorCodes,
    containsErrorCode(loginErrorCodes.INVALID_LOGIN_FORMAT),
  ),
);

//password
const passwordInput = (state) => state.controls.password;
const passwordInputValue = flow(passwordInput, getInputValue);
const passwordInputErrorCodes = flow(passwordInput, getInputErrorCodes);
const isPasswordInputMarkedAsError = or(
  flow(
    passwordInput,
    (input) => input.areErrorsMarked && hasInputAnyError(input),
  ),
  flow(
    postProcessingErrorCodes,
    containsErrorCode(loginErrorCodes.INCORRECT_PASSWORD),
  ),
);

const isPasswordInputDisabled = isProcessing;
const hasPasswordFormatError = and(
  isPasswordInputMarkedAsError,
  flow(
    passwordInputErrorCodes,
    containsErrorCode(loginErrorCodes.INVALID_PASSWORD_FORMAT),
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
  containsErrorCode(loginErrorCodes.SERVER_UNREACHABLE),
);
const visibleErrorCodes = [
  loginErrorCodes.INVALID_LOGIN_FORMAT,
  loginErrorCodes.LOGIN_NOT_FOUND,
  loginErrorCodes.INVALID_PASSWORD_FORMAT,
  loginErrorCodes.SERVER_UNREACHABLE,
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
  hasIncorrectPasswordError,
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
