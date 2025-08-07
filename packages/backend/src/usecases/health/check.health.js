import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";

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
