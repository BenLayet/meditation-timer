const noChange = (event, state) => state;

const createReducerFromEventHandlers = (eventHandlers) =>
    (event, state) =>
        (eventHandlers[event.eventType] ?? noChange)(event.payload, state);

const wrapFeatureReducer = (key) => (featureReducer) =>
    (event, state) => ({
        ...state,
        [key]: featureReducer(event, state[key])
    });
const createSubFeatureReducers = (subFeatures) =>
    Object.entries(subFeatures)
        .map(([key, subFeature]) => featureReducers(subFeature).map(wrapFeatureReducer(key)))
        .flat();

const featureReducers = (feature) => {
    const subFeatureReducers = createSubFeatureReducers(feature.subFeatures ?? {});
    const ownReducer = createReducerFromEventHandlers(feature.eventHandlers ?? {});
    return [...subFeatureReducers, ownReducer];
}
export const featureReducer = (feature) => {
    return (event, state) => featureReducers(feature).reduce((state, reducer) => reducer(event, state), state)
}