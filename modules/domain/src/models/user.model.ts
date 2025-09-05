const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const validateUserUuid = (userUuid) => {
  if (!userUuid || typeof userUuid !== "string")
    throw new Error("User ID must be a string but was " + typeof userUuid);
  if (!uuidRegex.test(userUuid))
    throw new Error("User ID must be a valid UUID but was: " + userUuid);
};
