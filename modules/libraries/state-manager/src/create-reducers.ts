import { getOwnStateAtPath, writeStateAtPath } from "./state";


import type { Component, State } from "./view-model";

interface Event {
  eventType: string;
  componentPath: string[];
  payload: any;
}

const noChange = (state: State) => state;
const reducerFromEventHandlers =
  (events: Record<string, { handler: (state: State, payload: any) => State }> = {}) =>
  (state: State, event: Event) =>
    (events[event.eventType]?.handler ?? noChange)(state, event.payload);
const getComponentAtPath = (component: Component, componentPath: string[]): Component =>
  componentPath.reduce(
    (result: Component, childName: string) => result.children![childName],
    component,
  );
const getReducer = (component: Component, componentPath: string[]) => (state: State, event: Event) => {
  const localComponent = getComponentAtPath(component, componentPath);
  const localReducer = reducerFromEventHandlers(localComponent.events as any);
  const localState = getOwnStateAtPath(state, componentPath);
  const newLocalState = localReducer(localState, event);
  return writeStateAtPath(state, componentPath, newLocalState);
};

export const componentReducer = (component: Component) => (state: State, event: Event) =>
  getReducer(component, event.componentPath)(state, event);
