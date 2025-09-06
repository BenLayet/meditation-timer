import {
  validateNotNull,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions";
import { errorCodes } from "@meditation-timer/domain/src/errors/error-codes.js";

export const getEventPage = ({ eventRepository, tokenService, logger }) => {
  validateNotNullObject({ eventRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async (userToken, pageRequest) => {
    validateNotNullObject({ pageRequest });
    validateNotNull({ userToken });
    logger.info(pageRequest, `Get event page`);

    // 1. get user uuid from token
    let userUuid;
    try {
      userUuid = await getUserUuidFromToken({ tokenService })(userToken);
      logger.info(`userUuid from token: ${userUuid}`);
    } catch (error) {
      logger.info(`userToken verification failed: ${error.message}`);
      throw new Error(errorCodes.INVALID_USER_TOKEN);
    }

    // 2. fetch a page of events
    return eventRepository.getEventPage(userUuid, pageRequest);
  };
};

const getUserUuidFromToken =
  ({ tokenService }) =>
  (userToken) => {
    const { userUuid } = tokenService.verify(userToken);
    return userUuid;
  };
