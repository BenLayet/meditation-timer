import { getOwnStateAtPath, writeStateAtPath } from "./state";

const noChange = (state: any) => state;
const reducerFromEventHandlers =
  (
    events: Record<string, { handler: (state: any, payload: any) => any }> = {},
  ) =>
  (state: any, event: any) =>
    (events[event.eventType]?.handler ?? noChange)(state, event.payload);
const getComponentAtPath = (component: any, componentPath: string[]): any =>
  componentPath.reduce(
    (result: any, childName: string) => result.children![childName],
    component,
  );
const getReducer =
  (component: any, componentPath: string[]) => (state: any, event: Event) => {
    const localComponent = getComponentAtPath(component, componentPath);
    const localReducer = reducerFromEventHandlers(localComponent.events as any);
    const localState = getOwnStateAtPath(state, componentPath);
    const newLocalState = localReducer(localState, event);
    return writeStateAtPath(state, componentPath, newLocalState);
  };

export const componentReducer = (component: any) => (state: any, event: any) =>
  getReducer(component, event.componentPath)(state, event);
