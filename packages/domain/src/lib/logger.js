import {compareObjects} from "./compare-objects.js";

export const logEvent = (newState, event, oldState) => {
    const diff = compareObjects(oldState, newState);
    const payload = event.payload;
    console.log(`${event.eventType}::${JSON.stringify(payload)}`);
    console.debug(diff);
    console.debug(newState);
}