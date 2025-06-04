import {
  validateInteger,
  validateNotNullObject,
  validateStrictlyPositiveInteger,
} from "../lib/assert/not-null.validator.js";

export const validateNewMeditation = (meditation) => {
  validateNotNullObject({ meditation });
  const { startedTimeInSeconds, durationInMinutes } = meditation;
  validateInteger({ startedTimeInSeconds }, { meditation });
  validateStrictlyPositiveInteger({ durationInMinutes }, { meditation });
};
