import {
  createAccountErrorCode,
  loginErrorCode,
} from "domain/src/models/account.model.js";

export const errorHandler =
  ({ logger }) =>
  (req, res, next, err) => {
    if (err instanceof SyntaxError && err.status === 400) {
      return res.status(400).json({
        error: "Bad request",
        details: "Invalid JSON",
      });
    }

    if (err.name === "ValidationError") {
      return res.status(422).json({
        error: "Validation Error",
        details: err.message,
      });
    }

    if (err.name === "FunctionalError") {
      return res.status(httpStatusMap[err.code] || 400).json({
        error: err.message,
        errorCodes: [err.code],
      });
    }

    // Default error
    logger.error(err);
    res.status(500).json({
      error: `Internal Server Error : ${err.message} `,
    });
  };
const httpStatusMap = {
  [createAccountErrorCode.LOGIN_ALREADY_EXISTS]: 409,
  [createAccountErrorCode.INVALID_LOGIN_FORMAT]: 405,
  [loginErrorCode.LOGIN_NOT_FOUND]: 401,
};
