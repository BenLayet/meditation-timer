import {
  createAccountErrorCode,
  loginErrorCode,
} from "domain/src/models/account.model.js";

export const errorHandler =
  ({ logger }) =>
  (request, response, next, error) => {
    if (error?.name === "FunctionalError") {
      return response.status(httpStatusMap[error.code] || 400).json({
        error: error.message,
        errorCodes: [error.code],
      });
    }

    // Default error
    logger.error(error);
    response.status(500).json({
      error: `Internal Server Error : ${error.message} `,
    });
  };
const httpStatusMap = {
  [createAccountErrorCode.LOGIN_ALREADY_EXISTS]: 409,
  [createAccountErrorCode.INVALID_LOGIN_FORMAT]: 405,
  [loginErrorCode.LOGIN_NOT_FOUND]: 401,
};
