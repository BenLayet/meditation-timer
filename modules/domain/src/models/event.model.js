import {
  validateNotEmptyString,
  validateNotNullObject,
} from "@softer-software/functions/assert.functions.js";
import { validateNewMeditation } from "./meditation.model.js";

export const eventTypes = {
  ADD_MEDITATION: "ADD_MEDITATION",
};
const validateEventType = (eventType) => {
  validateNotEmptyString({ eventType });
  if (!eventTypes[eventType])
    throw new Error(
      `Event type must be one of ${Object.values(eventTypes).join(", ")}`,
    );
};
const payloadValidators = {
  [eventTypes.ADD_MEDITATION]: validateNewMeditation,
};
const validateEventPayload = (eventType, payload) => {
  validateNotNullObject({ payload });
  payloadValidators[eventType](payload);
};

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const validateNewEvent = (event) => {
  validateNotNullObject({ event });
  if (typeof event.id !== "undefined")
    throw new Error("Event ID must not be set");
  if (!uuidRegex.test(event.uuid))
    throw new Error("event UUID must be a valid UUID but was: " + event.uuid);
  if (!uuidRegex.test(event.userUuid))
    throw new Error("userUuid must be a valid UUID but was: " + event.userUuid);
  validateEventType(event.type);
  validateEventPayload(event.type, event.payload);
};
