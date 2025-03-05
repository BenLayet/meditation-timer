import ow from "ow";

const wrapSelectorsWithFeatureStateSelector = (featureStateSelector, selectors) => {
    const result = {};
    Object.keys(selectors).forEach(key => {
        result[key] = (state) => selectors[key](featureStateSelector(state));
    });
    return result;
}

export const createSelectors = (features) => {
    ow(features, ow.object.valuesOfType(ow.object.partialShape({
        selectors: ow.optional.object
    })));

    const result = {};
    Object.keys(features)
        .filter(key => !!features[key].selectors)
        .forEach(key => {
            result[key] = wrapSelectorsWithFeatureStateSelector(
                state => state[key],
                features[key].selectors);
        });
    return result;
}