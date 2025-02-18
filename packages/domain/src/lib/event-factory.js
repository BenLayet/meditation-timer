export function createEventFactory(eventType, payloadFactory = () => ({})) {
    const eventFactory = (...args) => ({eventType, payload: payloadFactory(...args)});
    eventFactory.eventType = eventType;
    return eventFactory;
}