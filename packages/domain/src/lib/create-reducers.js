const noChange = (state) => state;

const createReducerFromEventHandlers = (eventHandlers) =>
    (state, event) =>
        (eventHandlers.get(event.eventType) ?? noChange)(state, event.payload);

const wrapFeatureReducer = (key) => (featureReducer) =>
    (state, event) => ({
        ...state,
        [key]: featureReducer(state[key], event)
    });
const createSubFeatureReducers = (subFeatures) =>
    Object.entries(subFeatures)
        .map(([key, subFeature]) => featureReducers(subFeature).map(wrapFeatureReducer(key)))
        .flat();

const featureReducers = (feature) => {
    const subFeatureReducers = createSubFeatureReducers(feature.subFeatures ?? {});
    const ownReducer = feature.eventHandlers ? createReducerFromEventHandlers(feature.eventHandlers) : noChange;
    return [...subFeatureReducers, ownReducer];
}
export const featureReducer = (feature) => {
    return (state, event) => featureReducers(feature).reduce((state, reducer) => reducer(state, event), state)
}