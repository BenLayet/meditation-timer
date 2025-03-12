import {getOwnStateAtPath, writeStateAtPath} from "./state.js";

const noChange = (state) => state;
const reducerFromEventHandlers = (events = {}) =>
    (state, event) => (events[event.eventType]?.handler ?? noChange)(state, event.payload);
const getComponentAtPath = (component, componentPath) =>
    componentPath.reduce((result, childName) =>
        result.children[childName], component);
const getReducer = (component, componentPath) =>
    (state, event) => {
            const localComponent = getComponentAtPath(component, componentPath);
            const localReducer = reducerFromEventHandlers(localComponent.events);
            const localState = getOwnStateAtPath(state, componentPath);
            const newLocalState = localReducer(localState, event);
            return writeStateAtPath(state, componentPath, newLocalState);
    }

export const componentReducer = (component) => (state, event) => getReducer(component, event.componentPath)(state, event)
