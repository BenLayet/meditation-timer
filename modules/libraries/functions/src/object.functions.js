export const map = (object, valueMapper) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      valueMapper(value, key),
    ]),
  );
