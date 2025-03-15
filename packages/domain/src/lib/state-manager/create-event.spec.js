import {describe, expect, it} from "vitest";
import {createEvent} from "./create-event";
import ow from "ow";

describe("createEvent", () => {
    it("should create an event with a sanitized payload", () => {
        const payloadShape = {
            key1: ow.string,
            key2: ow.number,
        };
        const eventType = "TestEvent";
        const componentPath = ["Component", "SubComponent"];
        const payload = {
            key1: "Hello",
            key2: 123,
            extraKey: "This should not be in the output",
        };

        const result = createEvent({payloadShape, eventType}, componentPath, payload);

        expect(result).toEqual({
            componentPath: ["Component", "SubComponent"],
            eventType: "TestEvent",
            payload: {
                key1: "Hello",
                key2: 123,
            },
        });
    });

    it("should throw an error if the payload does not match the payload shape", () => {
        const payloadShape = {
            key1: ow.string,
            key2: ow.number,
        };
        const eventType = "InvalidEvent";
        const componentPath = ["InvalidComponent"];
        const payload = {
            key1: "Hello",
            key2: "Not a number", // Incorrect type
        };

        expect(() => createEvent({payloadShape, eventType}, componentPath, payload)).toThrow(
            "Expected property `key2` to be of type `number` but received type `string` in object `::while creating event InvalidComponent:InvalidEvent"
        );
    });

    it("should throw an error if required keys are missing in the payload", () => {
        const payloadShape = {
            key1: ow.string,
            key2: ow.number,
        };
        const eventType = "MissingKeyEvent";
        const componentPath = ["MissingKeyComponent"];
        const payload = {
            key1: "Hello", // Missing 'key2'
        };

        expect(() => createEvent({payloadShape, eventType}, componentPath, payload)).toThrow(
            "Expected property `key2` to be of type `number` but received type `undefined` in object `::while creating event MissingKeyComponent:MissingKeyEvent`"
        );
    });

    it("should allow payload with an empty payloadShape", () => {
        const payloadShape = {};
        const eventType = "EmptyPayloadEvent";
        const componentPath = ["ComponentWithNoPayload"];
        const payload = {
            unexpectedKey: "This should not cause any errors",
        };

        const result = createEvent({payloadShape, eventType}, componentPath, payload);

        expect(result).toEqual({
            componentPath: ["ComponentWithNoPayload"],
            eventType: "EmptyPayloadEvent",
            payload: {}, // Sanitized to an empty object
        });
    });

});
