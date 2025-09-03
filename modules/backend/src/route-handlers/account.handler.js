import {
  createAccountErrorCodes,
  loginErrorCodes,
} from "domain/src/models/account.model.js";

export const createAccountHandler =
  ({ createAccountUsecase }) =>
  async (request, response) => {
    try {
      const account = await createAccountUsecase(request.body);
      response.status(201).json(account);
    } catch (error) {
      if (error?.name === "FunctionalError") {
        const json = functionalError(error);
        switch (error.code) {
          case createAccountErrorCodes.LOGIN_ALREADY_EXISTS:
            return response.status(409).json(json);
          case createAccountErrorCodes.INVALID_LOGIN_FORMAT:
            return response.status(405).json(json);
        }
      }
      throw error;
    }
  };

export const loginHandler =
  ({ loginUsecase }) =>
  async (request, response) => {
    try {
      const account = await loginUsecase(request.body);
      response.status(200).json(account);
    } catch (error) {
      if (error?.name === "FunctionalError") {
        const json = functionalError(error);
        switch (error.code) {
          case loginErrorCodes.LOGIN_NOT_FOUND:
            return response.status(401).json(json);
          case loginErrorCodes.INVALID_LOGIN_FORMAT:
            return response.status(405).json(json);
          case loginErrorCodes.INCORRECT_PASSWORD:
            return response.status(401).json(json);
        }
      }
      throw error;
    }
  };

const functionalError = (error) => ({
  error: error.message,
  errorCodes: [error.code],
});
