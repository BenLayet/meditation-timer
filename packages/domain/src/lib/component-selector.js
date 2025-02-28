import ow from "ow";

const wrapSelectorsWithComponentStateSelector = (componentStateSelector, selectors) => {
    const result = {};
    Object.keys(selectors).forEach(key => {
        result[key] = (state) => selectors[key](componentStateSelector(state));
    });
    return result;
}

export const createSelectors = (components) => {
    ow(components, ow.object.valuesOfType(ow.object.partialShape({
        selectors: ow.optional.object
    })));

    const result = {};
    Object.keys(components)
        .filter(key => !!components[key].selectors)
        .forEach(key => {
            result[key] = wrapSelectorsWithComponentStateSelector(
                state => state[key],
                components[key].selectors);
        });
    return result;
}