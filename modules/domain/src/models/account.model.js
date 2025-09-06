import { z } from "zod";

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
export const createAccountErrorCodes = {
  ...staticErrorCode,
  LOGIN_ALREADY_EXISTS: "LOGIN_ALREADY_EXISTS",
};
export const loginErrorCodes = {
  ...staticErrorCode,
  LOGIN_NOT_FOUND: "LOGIN_NOT_FOUND",
  INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
};

export const loginRegex = /^\S{2,}$/;
export const passwordRegex = /^\S{5,}$/;

export const loginSchema = z.string().min(1).regex(loginRegex);
export const passwordSchema = z.string().min(1).regex(passwordRegex);

export function validateLoginFormat(login) {
  loginSchema.parse(login);
}
export function validatePasswordFormat(password) {
  passwordSchema.parse(password);
}

export const isValidLoginFormat = (login) => loginSchema.safeParse(login).success;
export const isValidPasswordFormat = (password) => passwordSchema.safeParse(password).success;

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
    ? [loginErrorCodes.LOGIN_MISSING]
    : !isValidLoginFormat(login)
      ? [loginErrorCodes.INVALID_LOGIN_FORMAT]
      : [];
