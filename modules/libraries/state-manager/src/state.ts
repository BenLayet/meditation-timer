export const getStateAtPath = (
  globalState: any,
  componentPath: string[],
): any =>
  componentPath.reduce(
    (result: any, childName: string) =>
      result.children
        ? (result.children[childName] ?? { ownState: {}, children: {} })
        : { ownState: {}, children: {} },
    globalState,
  );
export const getOwnStateAtPath = (
  globalState: any,
  componentPath: string[],
): Record<string, unknown> =>
  getStateAtPath(globalState, componentPath).ownState;
export const getChildrenAtPath = (
  globalState: any,
  componentPath: string[],
): Record<string, any> => getStateAtPath(globalState, componentPath).children;
export const writeStateAtPath = (
  globalState: any,
  componentPath: string[],
  localState: Record<string, unknown>,
): any => {
  let currentPath = [...componentPath];
  let currentComponentState: any = {
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
