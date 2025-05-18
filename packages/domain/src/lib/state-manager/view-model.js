import {map} from "../functions/object.functions.js";
import {createEvent} from "./create-event.js";

const selectors = (component, state) =>
    map(component.selectors ?? {}, selector => () => selector(state));

const dispatchers = (component, dispatch, componentPath) =>
    map(component.events ?? {}, ({payloadShape, eventType}) => (payload = {}, isNewCycle=true) => {
        const event = createEvent({payloadShape, eventType}, componentPath, payload, isNewCycle);
        dispatch(event);
    });

const children = (component, state, dispatch, componentPath) =>
    map(component.children ?? {}, (childComponent, childName) =>
        getVM(
            childComponent,
            (state.children && state.children[childName]) ? state.children[childName] : {},
            dispatch,
            [...componentPath, childName]));

export const getVM = (component, state, dispatch, componentPath = []) => ({
    selectors: selectors(component, state),
    dispatchers: dispatchers(component, dispatch, componentPath),
    children: children(component, state, dispatch, componentPath),
})