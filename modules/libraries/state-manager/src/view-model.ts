
import { map } from "@softersoftware/functions/object.functions";
import { createEvent } from "./create-event.js";


export interface Component {
  selectors?: Record<string, (state: State) => unknown>;
  events?: Record<string, { payloadShape: any; eventType: string; isNewCycle?: boolean }>;
  children?: Record<string, Component>;
  initialState?: Record<string, unknown>;
}

export interface State {
  ownState: Record<string, unknown>;
  children: Record<string, State>;
}

export interface VM {
  selectors: Record<string, () => unknown>;
  dispatchers: Record<string, (payload?: any) => void>;
  children: Record<string, VM>;
}

const selectors = (component: Component, state: State) =>
  map(component.selectors ?? {}, (selector: (state: State) => unknown) => () => selector(state));

const dispatchers = (
  component: Component,
  dispatch: (event: any) => void,
  componentPath: string[],
) =>
  map(
    component.events ?? {},
    ({ payloadShape, eventType, isNewCycle }: { payloadShape: any; eventType: string; isNewCycle?: boolean }) =>
      (payload: any = {}) => {
        const event = createEvent(
          { payloadShape, eventType, isNewCycle },
          componentPath,
          payload,
        );
        dispatch(event);
      },
  );

const children = (
  component: Component,
  state: State,
  dispatch: (event: any) => void,
  componentPath: string[],
) =>
  map(component.children ?? {}, (childComponent: Component, childName: string) =>
    getVM(
      childComponent,
      state.children && state.children[childName]
        ? state.children[childName]
        : { ownState: {}, children: {} },
      dispatch,
      [...componentPath, childName],
    ),
  );

export const getVM = (
  component: Component,
  state: State,
  dispatch: (event: any) => void,
  componentPath: string[] = [],
): VM => ({
  selectors: selectors(component, state),
  dispatchers: dispatchers(component, dispatch, componentPath),
  children: children(component, state, dispatch, componentPath),
});
