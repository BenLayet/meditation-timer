import { validate } from "uuid";

export const validateUserUuid = (userUuid) => {
  if (!userUuid || typeof userUuid !== "string")
    throw new Error("User ID must be a string but was " + typeof userUuid);
  if (!validate(userUuid)) throw new Error("User ID must be a valid UUID but was: " + userUuid);
};