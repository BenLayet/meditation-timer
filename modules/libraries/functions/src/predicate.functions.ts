export const not =
  <T extends any[]>(predicate: (...args: T) => boolean) =>
  (...args: T): boolean =>
    !predicate(...args);

export const or =
  <T extends any[]>(...predicates: ((...args: T) => boolean)[]) =>
  (...args: T): boolean =>
    predicates.some((p) => p(...args));

export const and =
  <T extends any[]>(...predicates: ((...args: T) => boolean)[]) =>
  (...args: T): boolean =>
    predicates.every((p) => p(...args));
