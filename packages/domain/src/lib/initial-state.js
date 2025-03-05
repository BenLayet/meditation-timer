export const getInitialState = feature => {
    if (!feature.initialState && !feature.features) {
        throw new Error("feature should have either initialState or features");
    }
    if (feature.initialState && feature.features) {
        throw new Error("feature should have either initialState or features but not both");
    }
    if (feature.features) {
        return Object.keys(feature.features || {})
            .map(key => ({key, subFeature: feature.features[key]}))
            .reduce((state,{key, subFeature}) => ({...state, [key]: getInitialState(subFeature)}), {});
    }
    return feature.initialState || {};
}