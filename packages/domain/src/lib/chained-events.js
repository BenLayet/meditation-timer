const createChainedEventFactory = ({thenDispatch, withPayload}) => (previousEvent, state) => {
    const payload = withPayload ? withPayload(previousEvent.payload, state) : previousEvent.payload;
    return {eventType: thenDispatch, payload};
}
const createChainedEvents = chainedEvents => (previousEvent, state) => chainedEvents
    .filter(({onEvent}) => onEvent === previousEvent.eventType)
    .map(createChainedEventFactory)
    .map(newEventFactory => newEventFactory(previousEvent, state));

const createSubComponentEventFactories = (key, subComponent) =>
    (previousEvent, state) => createChainedEventFactories(subComponent)(previousEvent, state[key]);

export const createChainedEventFactories = (component) =>
    (previousEvent, state) => {
        const ownEvents = createChainedEvents(component.chainedEvents ?? [])(previousEvent, state);

        return Object
            .keys(component.subComponents ?? {})
            .map(key => ({key, subComponent: component.subComponents[key]}))
            .map(({key, subComponent}) => createSubComponentEventFactories(key, subComponent)(previousEvent, state))
            .reduce((allEvents, subComponentEvents) => [...allEvents, ...subComponentEvents], ownEvents);
    }