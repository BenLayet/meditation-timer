import { getOwnStateAtPath, writeStateAtPath } from "./state.js";
import type { Component, StateEvent, StateReducer } from "./types.js";

const noChange = (state: any): any => state;

const reducerFromEventHandlers =
  (events: Record<string, any> = {}) =>
  (state: any, event: StateEvent): any =>
    (events[event.eventType]?.handler ?? noChange)(state, event.payload);

const getComponentAtPath = (component: Component, componentPath: string[]): Component =>
  componentPath.reduce(
    (result, childName) => result.children![childName],
    component,
  );

const getReducer = (component: Component, componentPath: string[]): StateReducer => (state: any, event: StateEvent) => {
  const localComponent = getComponentAtPath(component, componentPath);
  const localReducer = reducerFromEventHandlers(localComponent.events);
  const localState = getOwnStateAtPath(state, componentPath);
  const newLocalState = localReducer(localState, event);
  return writeStateAtPath(state, componentPath, newLocalState);
};

export const componentReducer = (component: Component): StateReducer => (state: any, event: StateEvent) =>
  getReducer(component, event.componentPath)(state, event);
