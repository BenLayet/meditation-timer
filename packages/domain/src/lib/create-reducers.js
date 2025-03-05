const noChange = (event, state) => state;

const createReducer = (eventHandlers) =>
    (event, state) =>
        (eventHandlers[event.eventType] || noChange)(event.payload, state);

const wrapFeatureReducer = (key, featureReducer) =>
    (event, state) => ({
        ...state,
        [key]: featureReducer(event, state[key])
    });
const createAllReducers = (features) => Object.keys(features)
    .filter(key => features[key].eventHandlers)
    .map(key => wrapFeatureReducer(key, createReducer(features[key].eventHandlers)));

export const featuresReducer = (features) => {
    const reducers = createAllReducers(features);
    return (event, state) => reducers.reduce((state, reducer) => reducer(event, state), state)
}