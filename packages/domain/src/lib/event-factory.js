export function createEventFactory(eventType, payloadFactory = args => args) {
    const eventFactory = (...args) => ({eventType, payload: payloadFactory(...args)});
    eventFactory.eventType = eventType;
    return eventFactory;
}