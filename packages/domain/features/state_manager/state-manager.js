import {
    onAppOpened,
    onMeditationDurationSet,
    onActualMeditationStarted,
    onPreparationStarted, onTimerTicked
} from "../../src/app/app.reducers.js";
import {
    appOpenedHandler,
    languageDetectionRequestedHandler,
    meditationSessionStartedHandler
} from "../../src/app/app.event-handlers.js";
import {assertValidAppEvent, assertValidAppState} from "../../src/app/app.assertions.js";

export let state = {};
export const mockServices = {
    detectLanguage: () => 'en'
}

export function dispatch(eventName, payload) {
    //console.debug(`dispatching event: ${eventName} with payload: ${JSON.stringify(payload)}`);
    assertValidAppEvent(eventName, payload);
    const previousState = state;
    //console.debug(`previous state: ${JSON.stringify(previousState)}`);
    //reducers
    switch (eventName) {
        case 'APP_OPENED':
            state = onAppOpened(payload, state);
            break;
        case 'MEDITATION_DURATION_SET':
            state = onMeditationDurationSet(payload, state);
            break;
        case 'PREPARATION_STARTED':
            state = onPreparationStarted(payload, state);
            break;
        case 'ACTUAL_MEDITATION_STARTED':
            state = onActualMeditationStarted(payload, state);
            break;
        case 'TIMER_TICKED':
            state = onTimerTicked(payload, state);
            break;
    }
    //console.debug(`new state: ${JSON.stringify(state)}`);
    try {
        assertValidAppState(state);
    } catch (e) {
        e.message = `Invalid state: ${e.message}
         after event: ${eventName}
         with payload: ${JSON.stringify(payload)}
         previous state: ${JSON.stringify(previousState)}
         new state: ${JSON.stringify(state)}`;
        throw e;
    }

    //side effects
    switch (eventName) {
        case 'APP_OPENED':
            appOpenedHandler(dispatch);
            break;
        case 'MEDITATION_SESSION_STARTED':
            meditationSessionStartedHandler(dispatch, payload);
            break;
        case 'LANGUAGE_DETECTION_REQUESTED':
            languageDetectionRequestedHandler(mockServices.detectLanguage)(dispatch, payload);
            break;
        default:
            return state;
    }

}
