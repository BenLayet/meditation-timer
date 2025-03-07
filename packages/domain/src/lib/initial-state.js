export const getInitialState = feature => {
    if (!feature.initialState && !feature.subFeatures) {
        throw new Error("feature should have either initialState or subFeatures");
    }
    if (feature.initialState && feature.subFeatures) {
        throw new Error("feature should have either initialState or subFeatures but not both");
    }
    if (feature.subFeatures) {
        return Object.keys(feature.subFeatures ?? {})
            .map(key => ({key, subFeature: feature.subFeatures[key]}))
            .reduce((state,{key, subFeature}) => ({...state, [key]: getInitialState(subFeature)}), {});
    }
    return feature.initialState ?? {};
}