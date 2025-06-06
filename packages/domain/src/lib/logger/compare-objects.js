export const compareObjects = (oldObj, newObj) => {
  if (oldObj === newObj) {
    return {};
  }
  if (typeof oldObj !== "object" || typeof newObj !== "object") {
    return { old: oldObj, new: newObj };
  }

  const diff = {};
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  const removed = oldKeys.filter((key) => !newKeys.includes(key));
  const added = newKeys
    .filter((key) => !oldKeys.includes(key))
    .map((key) => ({ [key]: newObj[key] }));
  const changed = newKeys
    .filter((key) => oldKeys.includes(key))
    .map((key) => ({ key, ...compareObjects(oldObj[key], newObj[key]) }))
    .filter(({ key, ...diff }) => Object.keys(diff).length > 0);

  if (removed.length > 0) diff.removed = removed;
  if (added.length > 0) diff.added = added;
  if (changed.length > 0) diff.changed = changed;
  return diff;
};
