import {
  validateNotEmptyString,
  validateNotNullObject,
} from "@softer-software/functions/assert.functions.js";

export const healthCheckUsecase = ({ build, environment, logger }) => {
  validateNotNullObject({ build });
  validateNotEmptyString({ environment });
  validateNotNullObject({ logger });
  return () => {
    logger.info("Check health");
    return {
      status: "UP",
      build,
      environment,
    };
  };
};
