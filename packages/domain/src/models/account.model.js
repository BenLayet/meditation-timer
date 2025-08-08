export const accountStatus = {
  AUTHENTICATED: "AUTHENTICATED",
  ANONYMOUS: "ANONYMOUS",
};
const staticErrorCode = {
  LOGIN_MISSING: "LOGIN_MISSING",
  INVALID_LOGIN_FORMAT: "INVALID_LOGIN_FORMAT",
  PASSWORD_MISSING: "PASSWORD_MISSING",
  INVALID_PASSWORD_FORMAT: "INVALID_PASSWORD_FORMAT",
  SERVER_UNREACHABLE: "SERVER_UNREACHABLE",
};
export const createAccountErrorCode = {
  ...staticErrorCode,
  LOGIN_ALREADY_EXISTS: "LOGIN_ALREADY_EXISTS",
};
export const loginErrorCode = {
  ...staticErrorCode,
  LOGIN_NOT_FOUND: "LOGIN_NOT_FOUND",
  INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
};
export function validateLoginFormat(login) {
  if (typeof login !== "string") {
    throw new Error(`Login must be a string but was of type ${typeof login}`);
  }
  if (login.length === 0) {
    throw new Error(`Login cannot be empty`);
  }
  if (!isValidLoginFormat(login)) {
    throw new Error(
      `Login must be 3+ characters, excluding space character, but was: ${login}`,
    );
  }
}
export const loginRegex = /^\S{2,}$/;
export const passwordRegex = /^\S{5,}$/;
export const isValidLoginFormat = (login) => loginRegex.test(login);
export const isValidPasswordFormat = (password) => passwordRegex.test(password);

export const getLoginInputStaticErrorCodes = (loginInputValue) =>
  !loginInputValue
    ? [staticErrorCode.LOGIN_MISSING]
    : !isValidLoginFormat(loginInputValue)
      ? [staticErrorCode.INVALID_LOGIN_FORMAT]
      : [];
export const isLoginInputInvalid = (loginInputValue) =>
  getLoginInputStaticErrorCodes(loginInputValue).length > 0;

export const getPasswordInputStaticErrorCodes = (passwordInputValue) =>
  !passwordInputValue
    ? [staticErrorCode.PASSWORD_MISSING]
    : !isValidPasswordFormat(passwordInputValue)
      ? [staticErrorCode.INVALID_PASSWORD_FORMAT]
      : [];
export const isPasswordInputInvalid = (passwordInputValue) =>
  getPasswordInputStaticErrorCodes(passwordInputValue).length > 0;

export const getFormErrorCodes = (login) =>
  !login
    ? [loginErrorCode.LOGIN_MISSING]
    : !isValidLoginFormat(login)
      ? [loginErrorCode.INVALID_LOGIN_FORMAT]
      : [];
