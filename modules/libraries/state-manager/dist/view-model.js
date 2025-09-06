import { map } from "@softersoftware/functions/dist/object.functions";
import { createEvent } from "./create-event.js";
const selectors = (component, state) => map(component.selectors ?? {}, (selector) => () => selector(state));
const dispatchers = (component, dispatch, componentPath) => map(component.events ?? {}, ({ payloadShape, eventType, isNewCycle }) => (payload = {}) => {
    const event = createEvent({ payloadShape, eventType, isNewCycle }, componentPath, payload);
    dispatch(event);
});
const children = (component, state, dispatch, componentPath) => map(component.children ?? {}, (childComponent, childName) => getVM(childComponent, state.children && state.children[childName]
    ? state.children[childName]
    : { ownState: {}, children: {} }, dispatch, [...componentPath, childName]));
export const getVM = (component, state, dispatch, componentPath = []) => ({
    selectors: selectors(component, state),
    dispatchers: dispatchers(component, dispatch, componentPath),
    children: children(component, state, dispatch, componentPath),
});
