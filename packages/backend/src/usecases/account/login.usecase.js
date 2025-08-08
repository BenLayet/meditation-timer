import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";
import {
  loginErrorCode,
  validateLoginFormat,
} from "domain/src/models/account.model.js";
import { FunctionalError } from "../../errors/functional-error.js";

export const loginUsecase = ({ userRepository, tokenService, logger }) => {
  validateNotNullObject({ userRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async ({ login, password }) => {
    logger.info(login, `Login requested`);

    // Validate input
    try {
      validateNotEmptyString({ login });
    } catch (error) {
      throw new FunctionalError(error, loginErrorCode.LOGIN_MISSING);
    }
    // Validate input
    try {
      validateLoginFormat(login);
    } catch (error) {
      throw new FunctionalError(error, loginErrorCode.INVALID_LOGIN_FORMAT);
    }

    // get the user
    const user = await userRepository.getUser(login);
    if (!user) {
      throw new FunctionalError(
        `user ${login} not found`,
        loginErrorCode.LOGIN_NOT_FOUND,
      );
    }
    logger.info(`User retrieved: ${user.uuid}`);

    // create a permanent token for the user
    const userToken = tokenService.createPermanentToken({
      userUuid: user.uuid,
    });

    // return a projection of the user
    return { userToken };
  };
};
