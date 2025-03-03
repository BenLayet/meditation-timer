import {compareObjects} from "./compare-objects.js";

export const logEvent = (newState, event, oldState) => {
    const diff = compareObjects(oldState, newState);
    const payload = event.payload || {};
    console.log(`EVENT=${event.eventType}
    | PAYLOAD=${JSON.stringify(payload)}
    | DIFF=${JSON.stringify(diff)}
    | STATE=${JSON.stringify(newState)}`);
}