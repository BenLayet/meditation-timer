export const getInitialState = component => {
    if (!component.initialState && !component.subComponents) {
        throw new Error("component should have either initialState or subComponents");
    }
    return {
        ...component.initialState ?? {},
        ...Object.keys(component.subComponents ?? {})
            .map(key => ({key, subComponent: component.subComponents[key]}))
            .reduce((state, {key, subComponent}) => ({...state, [key]: getInitialState(subComponent)}), {})
    };
}