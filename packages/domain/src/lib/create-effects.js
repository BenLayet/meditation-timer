const wrapFeatureEffectThen = (key) =>
    (then) =>
        ({payload, dispatch, state}) => then({payload, dispatch, state: state[key]});

const wrapFeatureEffect = (key) => (featureEffect) => ({
    ...featureEffect,
    then: wrapFeatureEffectThen(key)(featureEffect.then)

});
const createSubFeatureEffects = (subFeatures, dependencies) =>
    Object.entries(subFeatures)
        .map(([key, subFeature]) => featureEffects(subFeature, dependencies).map(wrapFeatureEffect(key)))
        .flat();

export const featureEffects = (feature, dependencies) => {
    const subFeatureEffects = createSubFeatureEffects(feature.subFeatures ?? {}, dependencies);
    const ownEffects = feature.effects ? feature.effects(dependencies) : [];
    return [...subFeatureEffects, ...ownEffects];
}

