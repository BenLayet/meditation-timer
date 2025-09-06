import {
  validateNotEmptyString,
  validateNotNullObject,
} from "@softersoftware/functions/assert.functions";

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
