import { map } from "@softersoftware/functions/object.functions.js";
import { createEvent } from "./create-event.js";
import type { Component, ViewModel, DispatchFunction } from "./types.js";

const selectors = (component: Component, state: any): Record<string, () => any> =>
  map(component.selectors ?? {}, (selector) => () => selector(state));

const dispatchers = (component: Component, dispatch: DispatchFunction, componentPath: string[]): Record<string, (payload?: any) => void> =>
  map(
    component.events ?? {},
    ({ payloadShape, eventType, isNewCycle }) =>
      (payload: any = {}) => {
        const event = createEvent(
          { payloadShape, eventType, isNewCycle },
          componentPath,
          payload,
        );
        dispatch(event);
      },
  );

const children = (component: Component, state: any, dispatch: DispatchFunction, componentPath: string[]): Record<string, ViewModel> =>
  map(component.children ?? {}, (childComponent, childName) =>
    getVM(
      childComponent,
      state.children && state.children[childName]
        ? state.children[childName]
        : {},
      dispatch,
      [...componentPath, childName],
    ),
  );

export const getVM = (component: Component, state: any, dispatch: DispatchFunction, componentPath: string[] = []): ViewModel => ({
  selectors: selectors(component, state),
  dispatchers: dispatchers(component, dispatch, componentPath),
  children: children(component, state, dispatch, componentPath),
});
