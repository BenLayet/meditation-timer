import { validateNotNullObject } from "domain/src/lib/assert/not-null.validator.js";
import {
  createAccountErrorCode as createAccountErrorCodes,
  validateLoginFormat,
} from "domain/src/models/account.model.js";
import { datasourceErrorCodes } from "../../adapters/postgres.datasource.js";
import { FunctionalError } from "../../errors/functional-error.js";

export const createAccountUsecase = ({
  userRepository,
  tokenService,
  logger,
}) => {
  validateNotNullObject({ userRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async (login) => {
    logger.info(login, `Create account requested`);

    // Validate input
    try {
      validateLoginFormat(login);
    } catch (error) {
      throw new FunctionalError(
        error,
        createAccountErrorCodes.INVALID_LOGIN_FORMAT,
      );
    }

    // save the user
    let newUser;
    try {
      newUser = await userRepository.createUser(login);
    } catch (error) {
      if (error.code === datasourceErrorCodes.FOREIGN_KEY_VIOLATION) {
        throw new FunctionalError(
          `user ${login} already exists`,
          createAccountErrorCodes.LOGIN_ALREADY_EXISTS,
        );
      } else {
        throw error;
      }
    }
    logger.info(`User created: ${newUser.uuid}`);

    // create a permanent token for the user
    const userToken = tokenService.createPermanentToken({
      userUuid: newUser.uuid,
    });

    // return a projection of the user
    return { userToken };
  };
};
