export const not =
  (predicate) =>
  (...args) =>
    !predicate(...args);
export const or =
  (...predicates) =>
  (...args) =>
    predicates.some((p) => p(...args));
export const and =
  (...predicates) =>
  (...args) =>
    predicates.every((p) => p(...args));
