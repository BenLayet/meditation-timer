import { compareObjects } from "./compare-objects.js";

export const logEvent = (event, newState, oldState) => {
  const diff = compareObjects(oldState, newState);
  const payload = event.payload ?? {};
  console.debug(`EVENT=${event.componentPath.map((p) => p + ".").join("")}${event.eventType}
    | PAYLOAD=${JSON.stringify(payload)}
    | DIFF=${JSON.stringify(diff)}`);
  //| STATE=${JSON.stringify(newState)}
};
