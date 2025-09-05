// modules/domain/src/models/event.model.test.js
import { describe, it, expect } from "vitest";
import { validateNewEvent, eventTypes } from "./event.model.js";

const VALID_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("validateNewEvent", () => {
  it("throws when event is null/undefined", () => {
    expect(() => validateNewEvent(null)).toThrow();
    expect(() => validateNewEvent(undefined)).toThrow();
  });

  it("does not throw when everything OK", () => {
    const event = {
      uuid: VALID_UUID,
      userUuid: VALID_UUID,
      type: eventTypes.ADD_MEDITATION,
      payload: {
        startedTimeInSeconds: 123,
        durationInMinutes: 45,
      },
    };
    validateNewEvent(event);
  });
  it("throws when id is set", () => {
    const event = {
      id: 1,
      uuid: VALID_UUID,
      userUuid: VALID_UUID,
      type: eventTypes.ADD_MEDITATION,
      payload: {},
    };
    expect(() => validateNewEvent(event)).toThrow("Event ID must not be set");
  });

  it("throws when uuid is invalid", () => {
    const event = {
      uuid: "not-a-uuid",
      userUuid: VALID_UUID,
      type: eventTypes.ADD_MEDITATION,
      payload: {},
    };
    expect(() => validateNewEvent(event)).toThrow(
      "event UUID must be a valid UUID but was: not-a-uuid",
    );
  });

  it("throws when userUuid is invalid (even if type/payload are present)", () => {
    const event = {
      uuid: VALID_UUID,
      userUuid: "not-a-uuid",
      type: eventTypes.ADD_MEDITATION,
      payload: {}, // payload/type won't be reached due to early userUuid validation
    };
    expect(() => validateNewEvent(event)).toThrow(
      "userUuid must be a valid UUID but was: not-a-uuid",
    );
  });
  it("throws when startedTimeInSeconds is missing", () => {
    const event = {
      uuid: VALID_UUID,
      userUuid: VALID_UUID,
      type: eventTypes.ADD_MEDITATION,
      payload: {
        durationInMinutes: 45,
      },
    };
    expect(() => validateNewEvent(event)).toThrow(
      "Value of startedTimeInSeconds should be an integer, but was : undefined",
    );
  });
  it("throws when durationInMinutes is invalid", () => {
    const event = {
      uuid: VALID_UUID,
      userUuid: VALID_UUID,
      type: eventTypes.ADD_MEDITATION,
      payload: {
        startedTimeInSeconds: 123,
        durationInMinutes: 0,
      },
    };
    expect(() => validateNewEvent(event)).toThrow(
      "Value of durationInMinutes should be strictly positive, but was: 0",
    );
  });
  it("throws when type is invalid", () => {
    const event = {
      uuid: VALID_UUID,
      userUuid: VALID_UUID,
      type: "INVALID_TYPE",
      payload: {
        startedTimeInSeconds: 123,
        durationInMinutes: 45,
      },
    };
    expect(() => validateNewEvent(event)).toThrow(
      "Event type must be one of ADD_MEDITATION",
    );
  });
});
