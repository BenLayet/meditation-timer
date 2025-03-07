const wrapSelector = (key, selector) => (state) => selector(state[key]);
const wrapSelectors = (selectors) =>
    Object.fromEntries(
        Object.entries(selectors)
            .map(([key, selector]) => ([key, wrapSelector(key, selector)])));
/**
 *
 * @param feature
 * @returns {{[p: string]: {[p: string]: function(*): *}}}
 */
export const createSelectors = (feature) =>
    Object.fromEntries(
        Object.entries(feature.subFeatures || {})
            .map(([key, subFeature]) => ([
                key, {
                    ...wrapSelectors(subFeature.selectors),
                    ...wrapSelectors(createSelectors(subFeature))
                }
            ])));