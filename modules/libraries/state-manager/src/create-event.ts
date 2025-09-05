import ow from "ow";
import type { EventDefinition, StateEvent } from "./types.js";

function sanitizePayload(payload: any, payloadShape: any): any {
  // Remove keys in payload that do not exist in payloadShape
  return Object.fromEntries(
    Object.entries(payloadShape).map(([key]) => [key, payload[key]]),
  );
}

export const createEvent = (
  { payloadShape, eventType, isNewCycle }: EventDefinition,
  componentPath: string[],
  payload?: any,
): StateEvent => {
  payload = sanitizePayload(payload ?? {}, payloadShape ?? {});
  isNewCycle = !!isNewCycle;
  ow(
    payload,
    `::while creating event ${componentPath.join(".")}:${eventType} with payload ${JSON.stringify(payload)}`,
    ow.object.exactShape(payloadShape ?? {}),
  );
  return { componentPath, eventType, payload, isNewCycle };
};
