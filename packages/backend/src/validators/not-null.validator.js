
export const validateNotNull = (value, message = "Value cannot be null or undefined") => {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}
export const validateNotNullObject = (value, message = "Value should be a non null object but was of type: ") => {
  if (typeof value !== "object" || value === null) {
    throw new Error(message + typeof value);
  }
}
export const validateNotEmptyString = (value, message = "Value should be a non empty string") => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(message);
  }
}