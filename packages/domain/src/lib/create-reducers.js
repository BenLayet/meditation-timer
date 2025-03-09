const noChange = (state) => state;

const createReducerFromEventHandlers = (eventHandlers) =>
    (state, event) =>
        (eventHandlers.get(event.eventType) ?? noChange)(state, event.payload);

const wrapComponentReducer = (key) => (componentReducer) =>
    (state, event) => ({
        ...state,
        [key]: componentReducer(state[key], event)
    });
const createSubComponentReducers = (subComponents) =>
    Object.entries(subComponents)
        .map(([key, subComponent]) => componentReducers(subComponent).map(wrapComponentReducer(key)))
        .flat();

const componentReducers = (component) => {
    const subComponentReducers = createSubComponentReducers(component.subComponents ?? {});
    const ownReducer = component.eventHandlers ? createReducerFromEventHandlers(component.eventHandlers) : noChange;
    return [...subComponentReducers, ownReducer];
}
export const componentReducer = (component) => {
    return (state, event) => componentReducers(component).reduce((state, reducer) => reducer(state, event), state)
}