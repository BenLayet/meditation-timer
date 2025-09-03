import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";
import {
  loginErrorCodes,
  validateLoginFormat,
  validatePasswordFormat,
} from "domain/src/models/account.model.js";
import { FunctionalError } from "../../errors/functional-error.js";

export const loginUsecase = ({
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
    logger.info(login, `Login requested`);

    // Validate input
    try {
      validateNotEmptyString({ login });
    } catch (error) {
      throw new FunctionalError(error, loginErrorCodes.LOGIN_MISSING);
    }
    try {
      validateNotEmptyString({ password });
    } catch (error) {
      throw new FunctionalError(error, loginErrorCodes.PASSWORD_MISSING);
    }
    try {
      validateLoginFormat(login);
    } catch (error) {
      throw new FunctionalError(error, loginErrorCodes.INVALID_LOGIN_FORMAT);
    }
    try {
      validatePasswordFormat(password);
    } catch (error) {
      throw new FunctionalError(error, loginErrorCodes.INVALID_PASSWORD_FORMAT);
    }

    // get the user
    const user = await userRepository.getUser(login);
    if (!user) {
      throw new FunctionalError(
        `user ${login} not found`,
        loginErrorCodes.LOGIN_NOT_FOUND,
      );
    }

    //verify password
    if (!(await passwordHasher.verify(user.passwordHash, password))) {
      throw new FunctionalError(
        "Incorrect password",
        loginErrorCodes.INCORRECT_PASSWORD,
      );
    }

    // create a permanent token for the user
    const userToken = tokenService.createPermanentToken({
      userUuid: user.uuid,
    });

    // return a projection of the user
    return { userToken };
  };
};
