import { map } from "@softersoftware/functions/object.functions";
import { createEvent } from "./create-event";

const selectors = (component: any, state: any) =>
  map(
    component.selectors ?? {},
    (selector: (state: any) => unknown) => () => selector(state),
  );

const dispatchers = (
  component: any,
  dispatch: (event: any) => void,
  componentPath: string[],
) =>
  map(
    component.events ?? {},
    ({
      payloadShape,
      eventType,
      isNewCycle,
    }: {
      payloadShape: any;
      eventType: string;
      isNewCycle?: boolean;
    }) =>
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
  component: any,
  state: any,
  dispatch: (event: any) => void,
  componentPath: string[],
) =>
  map(component.children ?? {}, (childComponent: any, childName: string) =>
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
  component: any,
  state: any,
  dispatch: (event: any) => void,
  componentPath: string[] = [],
): any => ({
  selectors: selectors(component, state),
  dispatchers: dispatchers(component, dispatch, componentPath),
  children: children(component, state, dispatch, componentPath),
});
