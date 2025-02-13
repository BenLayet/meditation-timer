import {assertValidTimerState} from "../timer/timer.assertions.js";
import {getMeditationTimerState, getPreparationTimerState} from "./app.selectors.js";

// assert state
export const assertValidAppState = (state) => {
    try {
        assertValidTimerState(getMeditationTimerState(state));
    } catch (e) {
        e.message = `Invalid meditationTimer: ${e.message}`;
        throw e;
    }
    try {
        assertValidTimerState(getPreparationTimerState(state));
    } catch (e) {
        e.message = `Invalid preparationTimer: ${e.message}`;
        throw e;
    }
}

// assert event
function assertUndefinedPayload(payload) {
    if (typeof payload !== 'undefined') {
        throw new Error(`Unexpected payload : ${JSON.stringify(payload)}`);
    }
}

function assertDefinedPayload(payload) {
    if (typeof payload === 'undefined') {
        throw new Error(`Expected payload, got undefined`);
    }
}

function assertPositiveNumber(value) {
    if (typeof value !== 'number' || value < 0) {
        throw new Error(`Expecting a positive number, got ${JSON.stringify(value)}`);
    }
}

function assertProperty(payload, property, assertion) {
    try {
        assertion(payload[property]);
    } catch (e) {
        e.message = `Invalid payload: ${JSON.stringify(payload)}, 
                invalid property '${property}': ${e.message}`;
        throw e;
    }
}

function assertValidMeditationDurationSetPayload(payload) {
    assertDefinedPayload(payload);
    assertProperty(payload, 'durationInMinutes', assertPositiveNumber);
}

function assertValidMediationSessionStartedPayload(payload) {
    assertDefinedPayload(payload);
    assertProperty(payload, 'currentTimestampInSeconds', assertPositiveNumber);
}

function assertValidTimerTickedPayload(payload) {
    assertDefinedPayload(payload);
    assertProperty(payload, 'currentTimestampInSeconds', assertPositiveNumber);
}

function assertValidPreparationStartedPayload(payload) {
    assertDefinedPayload(payload);
    assertProperty(payload, 'currentTimestampInSeconds', assertPositiveNumber);
}

function assertValidActualMeditationStartedPayload(payload) {
    assertDefinedPayload(payload);
    assertProperty(payload, 'currentTimestampInSeconds', assertPositiveNumber);
}

const assertValueIn = expectedValues => value => {
    if (!expectedValues.includes(value)) {
        throw new Error(`Expecting one of ${JSON.stringify(expectedValues)}, got ${JSON.stringify(value)}`);
    }

}

function assertValidLanguageDetectedPayload(payload) {
    assertDefinedPayload(payload);
    assertProperty(payload, 'detectedLanguage', assertValueIn(['en', 'fr']));
}

export const assertValidAppEvent = (eventName, payload) => {
    try {

        switch (eventName) {
            case 'LANGUAGE_DETECTION_REQUESTED':
            case 'APP_OPENED':
                assertUndefinedPayload(payload);
                break;
            case 'MEDITATION_DURATION_SET':
                assertValidMeditationDurationSetPayload(payload);
                break;
            case 'MEDITATION_SESSION_STARTED':
                assertValidMediationSessionStartedPayload(payload);
                break;
            case 'TIMER_TICKED':
                assertValidTimerTickedPayload(payload);
                break;
            case 'PREPARATION_STARTED':
                assertValidPreparationStartedPayload(payload);
                break;
            case 'ACTUAL_MEDITATION_STARTED':
                assertValidActualMeditationStartedPayload(payload);
                break;
            case 'LANGUAGE_DETECTED':
                assertValidLanguageDetectedPayload(payload);
                break;
            default:
                throw new Error(`Unknown event: ${eventName}`);
        }
    } catch (e) {
        e.message = `Invalid payload for event: ${e.message}`;
        throw e;
    }

}