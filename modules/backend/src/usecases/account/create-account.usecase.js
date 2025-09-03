import { validateNotNullObject } from "@softer-software/functions/assert.functions.js";
import {
  createAccountErrorCodes,
  validateLoginFormat,
  validatePasswordFormat,
} from "@meditation-timer/domain/src/models/account.model.js";
import { FunctionalError } from "../../errors/functional-error.js";

export const createAccountUsecase = ({
  userRepository,
  tokenService,
  passwordHasher,
  logger,
}) => {
  validateNotNullObject({ userRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ passwordHasher });
  validateNotNullObject({ logger });

  return async ({ login, password }) => {
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
    try {
      validatePasswordFormat(password);
    } catch (error) {
      throw new FunctionalError(
        error,
        createAccountErrorCodes.INVALID_PASSWORD_FORMAT,
      );
    }
    //hash the password
    const passwordHash = await passwordHasher.hash(password);

    // save the user
    const newUser = await userRepository.createUser(login, passwordHash);
    logger.info(`User created: ${newUser.uuid}`);

    // create a permanent token for the user
    const userToken = tokenService.createPermanentToken({
      userUuid: newUser.uuid,
    });

    // return a projection of the user
    return { userToken };
  };
};
