export const validateNotNull = (holder: Record<string, any>, context: any = null): void => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (value === null || value === undefined) {
    if (context) console.error(context);
    throw new Error(
      `Value of '${key}' should not be null or undefined but was: ${value}`,
    );
  }
};

export const validateNotNullObject = (holder: Record<string, any>, context: any = null): void => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "object" || value === null) {
    if (context) console.error(context);
    throw new Error(
      `Value of ${key} should be a non null object but was of type: ${typeof value}`,
    );
  }
};

export const validateObjectWithNoNullValue = (holder: Record<string, any>, context: any = null): void => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  validateNotNullObject({ value }, context);
  Object.entries(value).forEach(([subKey, subValue]) => {
    validateNotNull({ [subKey]: subValue }, { parentContext: context, value });
  });
};

export const validateNotEmptyString = (holder: Record<string, any>, context: any = null): void => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "string") {
    if (context) console.error(context);
    throw new Error(
      `Value of ${key} should be a non empty string, but was of type: ${typeof value}`,
    );
  }
  if (value.trim() === "") {
    if (context) console.error(context);
    throw new Error(
      `Value of ${key} should be a non empty string, but was: '${value}'`,
    );
  }
};

export const validateFunction = (holder: Record<string, any>, context: any = null): void => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (typeof value !== "function") {
    if (context) console.error(context);
    throw new Error(
      `Value of ${key} should be a function, but was of type: ${typeof value}`,
    );
  }
};

export const validateInteger = (holder: Record<string, any>, context: any = null): void => {
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (!Number.isInteger(value)) {
    if (context) console.error(context);
    throw new Error(`Value of ${key} should be an integer, but was : ${value}`);
  }
};

export const validatePositiveInteger = (holder: Record<string, any>, context: any = null): void => {
  validateInteger(holder, context);
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (value < 0) {
    if (context) console.error(context);
    throw new Error(`Value of ${key} should be positive, but was: ${value}`);
  }
};

export const validateStrictlyPositiveInteger = (holder: Record<string, any>, context: any = null): void => {
  validateInteger(holder, context);
  const [key] = Object.keys(holder);
  const value = holder[key];
  if (value < 1) {
    if (context) console.error(context);
    throw new Error(
      `Value of ${key} should be strictly positive, but was: ${value}`,
    );
  }
};
