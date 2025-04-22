import {map} from "../functions/object.functions.js";
import {createEvent} from "./create-event.js";

const getSelectors = (component, state) =>
    map(component.selectors ?? {}, selector => () => selector(state));

const getEvents = (component, dispatch, componentPath) =>
    map(component.events ?? {}, ({payloadShape, eventType}) => (payload = {}) => {
        const event = createEvent({payloadShape, eventType}, componentPath, payload);
        dispatch(event);
    });

const getChildren = (component, state, dispatch, componentPath) =>
    map(component.children ?? {}, (childComponent, childName) =>
        getVM(
            childComponent,
            (state.children && state.children[childName]) ? state.children[childName] : {},
            dispatch,
            [...componentPath, childName]));

export const getVM = (component, state, dispatch, componentPath = []) => ({
    selectors: getSelectors(component, state),
    dispatchers: getEvents(component, dispatch, componentPath),
    children: getChildren(component, state, dispatch, componentPath),
})