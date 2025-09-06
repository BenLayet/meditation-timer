import {
  validateNotNull,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions";
import { errorCodes } from "@meditation-timer/domain/src/errors/error-codes.js";
import { validateNewEvent } from "@meditation-timer/domain/src/models/event.model.js";

export const postEvent = ({ eventRepository, tokenService, logger }) => {
  validateNotNullObject({ eventRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async (userToken, event) => {
    logger.info(event, `Post event requested`);

    // Validate input
    validateNotNullObject({ event });
    validateNotNull({ userToken });

    // Get user uuid from token
    let userUuid;
    try {
      userUuid = await getUserUuidFromToken({ tokenService })(userToken);
      logger.info(`userUuid from token: ${userUuid}`);
    } catch (error) {
      logger.info(`userToken verification failed: ${error.message}`);
      throw new Error(errorCodes.INVALID_USER_TOKEN);
    }
    //prepare the event entity to be saved
    const eventEntity = { ...event, userUuid };
    validateNewEvent(eventEntity);

    // save the event
    const savedEvent = await eventRepository.saveEvent(eventEntity);
    logger.info(`Event created: ${savedEvent.id}`);

    // return a projection of the saved event
    const eventDto = { ...savedEvent };
    delete eventDto.userUuid;
    return eventDto;
  };
};

const getUserUuidFromToken =
  ({ tokenService }) =>
  (userToken) => {
    const { userUuid } = tokenService.verify(userToken);
    return userUuid;
  };
