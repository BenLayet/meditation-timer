import {
  createAccountErrorCode,
  loginErrorCode,
} from "domain/src/models/account.model.js";

export const createAccountHandler =
  ({ createAccountUsecase }) =>
  async (request, response, next) => {
    const { login } = request.body;
    try {
      const account = await createAccountUsecase(login);
      response.status(201).json(account);
    } catch (error) {
      if (error?.name === "FunctionalError") {
        const json = functionalError(error);
        switch (error.code) {
          case createAccountErrorCode.LOGIN_ALREADY_EXISTS:
            return response.status(409).json(json);
          case createAccountErrorCode.INVALID_LOGIN_FORMAT:
            return response.status(405).json(json);
        }
      }
      next(error);
    }
  };

export const loginHandler =
  ({ loginUsecase }) =>
  async (request, response, next) => {
    const { login } = request.query;
    try {
      const account = await loginUsecase(login);
      response.status(200).json(account);
    } catch (error) {
      if (error?.name === "FunctionalError") {
        const json = functionalError(error);
        switch (error.code) {
          case loginErrorCode.LOGIN_NOT_FOUND:
            return response.status(401).json(json);
          case createAccountErrorCode.INVALID_LOGIN_FORMAT:
            return response.status(405).json(json);
        }
      }
      next(error);
    }
  };

const functionalError = (error) => ({
  error: error.message,
  errorCodes: [error.code],
});
