import {timerReducers} from "../timer/timer.reducers.js";
import {validateAppState, INITIAL_STATE} from "./app.state.js";
import {APP_OPENED} from "./app.events.js";
import {GONG_VOLUME_SET, MEDITATION_DURATION_SET} from "../meditation-session/meditation-session.events.js";
import {PREPARATION_STARTED} from "../meditation-session/preparation/preparation.events.js";
import {ACTUAL_MEDITATION_STARTED} from "../meditation-session/actual-meditation/actual-meditation.events.js";
import {TIMER_TICKED} from "../timer/timer.events.js";

const onAppOpened = () => INITIAL_STATE;
const onMeditationDurationSet = (payload, state) => ({
    ...state,
    meditationTimer: timerReducers.onDurationSet(payload, state.meditationTimer)
});
const onGongVolumeSet = (payload, state) => ({
    ...state,
    settings: {...state.settings, gongVolume: payload}
});

const onPreparationStarted = (payload, state) => ({
    ...state,
    phase: 'PREPARATION',
    preparationTimer: timerReducers.onTimerStarted(payload, state.preparationTimer)
});
const onActualMeditationStarted = (payload, state) => ({
    ...state,
    phase: 'ACTUAL_MEDITATION',
    meditationTimer: timerReducers.onTimerStarted(payload, state.meditationTimer)
});
const onTimerTicked = (payload, state) => {
    switch (state.phase) {
        case 'PREPARATION':
            return {...state, preparationTimer: timerReducers.onTimerTicked(payload, state.preparationTimer)}
        case 'ACTUAL_MEDITATION':
            return {...state, meditationTimer: timerReducers.onTimerTicked(payload, state.meditationTimer)}
        default:
            throw new Error(`Invalid phase: expected PREPARATION or ACTUAL_MEDITATION, got ${state.phase}`);
    }
};

export const appReducers = (event, state) => {
    const previousState = state;
    const payload = event.payload;

    switch (event.type) {
        case APP_OPENED:
            state = onAppOpened(payload, state);
            break;
        case MEDITATION_DURATION_SET:
            state = onMeditationDurationSet(payload, state);
            break;
        case PREPARATION_STARTED:
            state = onPreparationStarted(payload, state);
            break;
        case ACTUAL_MEDITATION_STARTED:
            state = onActualMeditationStarted(payload, state);
            break;
        case GONG_VOLUME_SET:
            state = onGongVolumeSet(payload, state);
            break;
        case TIMER_TICKED:
            state = onTimerTicked(payload, state);
            break;
    }
    try {
        validateAppState(state);
    } catch (e) {
        e.message = `Invalid state: ${e.message}
         after event: ${event.type}
         with payload: ${JSON.stringify(payload)}
         previous state: ${JSON.stringify(previousState)}
         new state: ${JSON.stringify(state)}`;
        throw e;
    }
    return state;
}