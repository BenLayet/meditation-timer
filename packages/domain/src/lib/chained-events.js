const createChainedEventFactory = ({thenDispatch, withPayload}) => (previousEvent, state) => {
    const payload = withPayload ? withPayload(previousEvent.payload, state) : previousEvent.payload;
    return {eventType: thenDispatch, payload};
}
const createChainedEvents = chainedEvents => (previousEvent, state) => chainedEvents
    .filter(({onEvent}) => onEvent === previousEvent.eventType)
    .map(createChainedEventFactory)
    .map(newEventFactory => newEventFactory(previousEvent, state));

const createSubFeatureEventFactories = (key, subFeature) =>
    (previousEvent, state) => createChainedEventFactories(subFeature)(previousEvent, state[key]);

export const createChainedEventFactories = (feature) =>
    (previousEvent, state) => {
        const ownEvents = createChainedEvents(feature.chainedEvents ?? [])(previousEvent, state);

        return Object
            .keys(feature.subFeatures ?? {})
            .map(key => ({key, subFeature: feature.subFeatures[key]}))
            .map(({key, subFeature}) => createSubFeatureEventFactories(key, subFeature)(previousEvent, state))
            .reduce((allEvents, subFeatureEvents) => [...allEvents, ...subFeatureEvents], ownEvents);
    }