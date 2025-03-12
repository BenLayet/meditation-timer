const wrapSelector = (key, selector) => (state) => selector(state[key]);
const wrapSelectors = (selectors) =>
    Object.fromEntries(
        Object.entries(selectors)
            .map(([key, selector]) => ([key, wrapSelector(key, selector)])));
export const createSelectors = (component) =>
    Object.fromEntries(
        Object.entries(component.subComponents ?? {})
            .map(([key, subComponent]) => ([
                key, {
                    ...wrapSelectors(subComponent.selectors),
                    ...wrapSelectors(createSelectors(subComponent))
                }
            ])));