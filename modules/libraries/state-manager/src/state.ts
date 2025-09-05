export const getStateAtPath = (globalState: any, componentPath: string[]): any =>
  componentPath.reduce(
    (result, childName) =>
      result.children ? (result.children[childName] ?? {}) : {},
    globalState,
  );

export const getOwnStateAtPath = (globalState: any, componentPath: string[]): any =>
  getStateAtPath(globalState, componentPath).ownState;

export const getChildrenAtPath = (globalState: any, componentPath: string[]): any =>
  getStateAtPath(globalState, componentPath).children;

export const writeStateAtPath = (globalState: any, componentPath: string[], localState: any): any => {
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
