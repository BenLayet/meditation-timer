import {
  validateInteger,
  validateNotNullObject,
  validateStrictlyPositiveInteger,
} from "@softer-software/functions/assert.functions.js";

export const validateNewMeditation = (meditation) => {
  validateNotNullObject({ meditation });
  const { startedTimeInSeconds, durationInMinutes } = meditation;
  validateInteger({ startedTimeInSeconds }, { meditation });
  validateStrictlyPositiveInteger({ durationInMinutes }, { meditation });
};
