import type { StateManager } from "./state-manager.js";

const writeStateAtPath = (globalState: any, componentPath: string[], localState: any): any =>
  componentPath
    .slice()
    .reverse()
    .reduce(
      (childState, childName, index) => {
        const { children, ownState } = getStateAtPath(
          globalState,
          componentPath.slice(0, componentPath.length - 1 - index),
        );
        return {
          children: {
            ...children,
            [childName]: {
              ...(children[childName] ?? {}),
              ...childState,
            },
          },
          ownState,
        };
      },
      { ownState: localState },
    );

const getStateAtPath = (globalState: any, componentPath: string[] = []): any =>
  componentPath.reduce(
    (result, childName) => result.children[childName],
    globalState,
  );

const getValueAtPath = (globalObject: any, path: string[]): any =>
  path.reduce((res, property) => res[property], globalObject);

const writeValueAtPath = (globalObject: any, path: string[], patch: any): any =>
  path
    .slice()
    .reverse()
    .reduce(
      (res, property, index) => ({
        ...getValueAtPath(globalObject, path.slice(0, path.length - 1 - index)),
        [property]: res,
      }),
      patch,
    );

const parseKey = (key: string, state: any) =>
  key.split(".").reduce(
    (res, property) => {
      const newState = res.newState.children[property];
      const pathCompleted = res.pathCompleted || !newState;
      if (pathCompleted) {
        return {
          ...res,
          remainderPath: [...res.remainderPath, property],
          pathCompleted,
        };
      } else {
        return {
          ...res,
          newState,
          componentPath: [...res.componentPath, property],
          pathCompleted,
        };
      }
    },
    {
      newState: state,
      componentPath: [] as string[],
      remainderPath: [] as string[],
      pathCompleted: false,
    },
  );

export const statePatcher = (stateManager: StateManager) => (key?: string, value?: any): any => {
  const { componentPath, remainderPath } = key
    ? parseKey(key, (stateManager as any).state)
    : { componentPath: [] as string[], remainderPath: [] as string[] };
  const localState = getStateAtPath((stateManager as any).state, componentPath);
  if (typeof localState !== "object") {
    throw new Error(
      `componentPath ${componentPath} does not point to an object but to ${localState}`,
    );
  }
  if (!value) {
    return getValueAtPath(localState.ownState, remainderPath);
  }
  const newLocalState = writeValueAtPath(
    localState.ownState,
    remainderPath,
    value,
  );
  const newState = writeStateAtPath(
    (stateManager as any).state,
    componentPath,
    newLocalState,
  );
  forceState(stateManager, newState);
  return newLocalState;
};

export const forceState = (stateManager: StateManager, newState: any): void => {
  stateManager.dispatch({
    eventType: "FORCE_STATE",
    payload: { newState },
    componentPath: [],
    isNewCycle: true,
  });
};
