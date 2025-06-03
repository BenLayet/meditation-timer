export const validateNotNull = (holder, context = null) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (value === null || value === undefined) {
    if (context) console.error(context);
    throw new Error(
      `Value of '${key}' should not be null or undefined but was: ${value}`,
    );
  }
};
export const validateNotNullObject = (holder, context = null) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "object" || value === null) {
    if (context) console.error(context);
    throw new Error(
      `Value of ${key} should be a non null object but was of type: ${typeof value}`,
    );
  }
};
export const validateObjectWithNoNullValue = (holder, context = null) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  validateNotNullObject({ value }, context);
  Object.entries(value).forEach(([subKey, subValue]) => {
    validateNotNull({ [subKey]: subValue }, { parentContext: context, value });
  });
};
export const validateNotEmptyString = (holder, context = null) => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "string") {
    if (context) console.error(context);
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
