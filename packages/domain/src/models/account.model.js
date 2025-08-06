export const accountStatus = {
  AUTHENTICATED: "AUTHENTICATED",
  ANONYMOUS: "ANONYMOUS",
};
export const createAccountErrorCode = {
  LOGIN_MISSING: "LOGIN_MISSING",
  LOGIN_ALREADY_EXISTS: "LOGIN_ALREADY_EXISTS",
  INVALID_LOGIN_FORMAT: "INVALID_LOGIN_FORMAT",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
};
export const loginErrorCode = {
  LOGIN_MISSING: "LOGIN_MISSING",
  INVALID_LOGIN_FORMAT: "INVALID_LOGIN_FORMAT",
  LOGIN_NOT_FOUND: "LOGIN_NOT_FOUND",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
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
export const loginRegex = /^\S{3,}$/;
export const isValidLoginFormat = (login) => loginRegex.test(login);

export const getErrorCodes = (login) =>
  !login
    ? [loginErrorCode.LOGIN_MISSING]
    : !isValidLoginFormat(login)
      ? [loginErrorCode.INVALID_LOGIN_FORMAT]
      : [];
export const hasError = (login) => getErrorCodes(login).length > 0;
