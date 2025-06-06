const writeStateAtPath = (globalState, componentPath, localState) =>
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
const getStateAtPath = (globalState, componentPath = []) =>
  componentPath.reduce(
    (result, childName) => result.children[childName],
    globalState,
  );
const getValueAtPath = (globalObject, path) =>
  path.reduce((res, property) => res[property], globalObject);
const writeValueAtPath = (globalObject, path, patch) =>
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
const parseKey = (key, state) =>
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
      componentPath: [],
      remainderPath: [],
      pathCompleted: false,
    },
  );
export const statePatcher = (stateManager) => (key, value) => {
  const { componentPath, remainderPath } = key
    ? parseKey(key, stateManager.state)
    : { componentPath: [], remainderPath: [] };
  const localState = getStateAtPath(stateManager.state, componentPath);
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
    stateManager.state,
    componentPath,
    newLocalState,
  );
  forceState(stateManager, newState);
  return newLocalState;
};

export const forceState = (stateManager, newState) => {
  stateManager.dispatch({
    eventType: "FORCE_STATE",
    payload: { newState },
    componentPath: [],
    isNewCycle: true,
  });
};
