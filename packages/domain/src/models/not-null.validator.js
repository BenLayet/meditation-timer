export const validateNotNull = (holder) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (value === null || value === undefined) {
    throw new Error(
      `Value of ${key} should not be null or undefined but was of type: ${typeof value}`,
    );
  }
};
export const validateNotNullObject = (holder) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "object" || value === null) {
    throw new Error(
      `Value of ${key} should a non null object but was of type: ${typeof value}`,
    );
  }
};
export const validateNotEmptyString = (holder) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "string") {
    throw new Error(
      `Value of ${key} should be a non empty string, but was of type: ${typeof value}`,
    );
  }
  if (value.trim() === "") {
    throw new Error(
      `Value of ${key} should be a non empty string, but was: '${value}'`,
    );
  }
};

export const validateFunction = (holder) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "function") {
    throw new Error(
      `Value of ${key} should be a function, but was of type: ${typeof value}`,
    );
  }
};
