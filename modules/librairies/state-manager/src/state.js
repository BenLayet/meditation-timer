export const getStateAtPath = (globalState, componentPath) =>
  componentPath.reduce(
    (result, childName) =>
      result.children ? (result.children[childName] ?? {}) : {},
    globalState,
  );
export const getOwnStateAtPath = (globalState, componentPath) =>
  getStateAtPath(globalState, componentPath).ownState;
export const getChildrenAtPath = (globalState, componentPath) =>
  getStateAtPath(globalState, componentPath).children;
export const writeStateAtPath = (globalState, componentPath, localState) => {
  let currentPath = [...componentPath];
  let currentComponentState = {
    children: getChildrenAtPath(globalState, currentPath),
    ownState: localState,
  };
  [...componentPath].reverse().forEach((childName) => {
    currentPath.pop();
    currentComponentState = {
      ownState: getOwnStateAtPath(globalState, currentPath),
      children: {
        ...getChildrenAtPath(globalState, currentPath),
        [childName]: currentComponentState,
      },
    };
  });
  return currentComponentState;
};
