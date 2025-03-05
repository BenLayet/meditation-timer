const noChange = (event, state) => state;
const createReducer = (eventHandlers) =>
    (event, state) =>
        (eventHandlers[event.eventType] || noChange)(event.payload, state)
const wrapComponentReducer = (key, componentReducer) =>
    (event, state) => ({
        ...state,
        [key]: componentReducer(event, state[key])
    });
const createAllReducers = (components) => Object.keys(components)
    .filter(key => components[key].eventHandlers)
    .map(key => wrapComponentReducer(key, createReducer(components[key].eventHandlers)));

export const componentsReducer = (components) => {
    const reducers = createAllReducers(components);
    return (event, state) => reducers.reduce((state, reducer) => reducer(event, state), state)
}