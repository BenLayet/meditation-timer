const wrapComponentEffectThen = (key) =>
    (then) =>
        ({payload, dispatch, state}) => then({payload, dispatch, state: state[key]});

const wrapComponentEffect = (key) => (componentEffect) => ({
    ...componentEffect,
    then: wrapComponentEffectThen(key)(componentEffect.then)

});
const createSubComponentEffects = (subComponents, dependencies) =>
    Object.entries(subComponents)
        .map(([key, subComponent]) => componentEffects(subComponent, dependencies).map(wrapComponentEffect(key)))
        .flat();

export const componentEffects = (component, dependencies) => {
    const subComponentEffects = createSubComponentEffects(component.subComponents ?? {}, dependencies);
    const ownEffects = component.effects ? component.effects(dependencies) : [];
    return [...subComponentEffects, ...ownEffects];
}

