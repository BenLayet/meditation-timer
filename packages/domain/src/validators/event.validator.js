import { validate } from "uuid";

const EVENT_TYPES = ["ADD_MEDITATION"];
const validateEventType = (eventType) => {
  if (!eventType || typeof eventType !== "string")
    throw new Error("Event type must be a string");
  if (!EVENT_TYPES.includes(eventType))
    throw new Error(`Event type must be one of ${EVENT_TYPES.join(", ")}`);
};
const validateEventPayload = (payload) => {
  if (!payload || typeof payload !== "object")
    throw new Error("Event payload must be an object");
  if (Array.isArray(payload))
    throw new Error("Event payload cannot be an array");
  if (Object.keys(payload).length === 0)
    throw new Error("Event payload cannot be an empty object");
};

export const validateNewEvent = (event) => {
  if (!event) throw new Error("Event cannot be null or undefined");
  if (typeof event.id !== "undefined")
    throw new Error("Event ID must not be set");
  if (!validate(event.uuid))
    throw new Error("event UUID must be a valid UUID but was: " + userUuid);
  validateEventType(event.type);
  validateEventPayload(event.payload);
};
