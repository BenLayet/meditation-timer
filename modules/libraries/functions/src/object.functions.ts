//TODO move this to state manager
export const map = <T, R>(
  object: Record<string, T>,
  valueMapper: (value: T, key: string) => R,
): Record<string, R> =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      valueMapper(value, key),
    ]),
  );
