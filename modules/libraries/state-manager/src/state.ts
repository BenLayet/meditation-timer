
import type { State } from "./view-model";

export const getStateAtPath = (globalState: State, componentPath: string[]): State =>
  componentPath.reduce(
    (result: State, childName: string) =>
      result.children ? (result.children[childName] ?? { ownState: {}, children: {} }) : { ownState: {}, children: {} },
    globalState,
  );
export const getOwnStateAtPath = (globalState: State, componentPath: string[]): Record<string, unknown> =>
  getStateAtPath(globalState, componentPath).ownState;
export const getChildrenAtPath = (globalState: State, componentPath: string[]): Record<string, State> =>
  getStateAtPath(globalState, componentPath).children;
export const writeStateAtPath = (globalState: State, componentPath: string[], localState: Record<string, unknown>): State => {
  let currentPath = [...componentPath];
  let currentComponentState: State = {
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
