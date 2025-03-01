import {floor, max} from "lodash-es";
import {
    actualMeditationLessTimeRequested,
    actualMeditationMoreTimeRequested,
    actualMeditationResetRequested,
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "./actual-meditation.events.js";

export const ACTUAL_MEDITATION_INITIAL_STATE = {
    durationInMinutes: 20,
    timeIncrementInMinutes: 5,
};

const durationInSeconds = state => {
    return state.durationInMinutes * 60;
}
const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? floor((currentTimeInSeconds - state.startedTimeInSeconds)) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state)]);
}
const onActualMeditationResetRequested = () => ACTUAL_MEDITATION_INITIAL_STATE;
const onActualMeditationStartRequested = ({currentTimeInSeconds}, state) => ({
    ...state,
    startedTimeInSeconds: currentTimeInSeconds,
    remainingSeconds: durationInSeconds(state),
});
const onActualMeditationTimerTicked = ({currentTimeInSeconds}, state) => ({
    ...state,
    remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
});

function calculateIncrementedDuration(state) {
    return floor((state.durationInMinutes + state.timeIncrementInMinutes) / state.timeIncrementInMinutes)
        * state.timeIncrementInMinutes;
}

const onActualMeditationAddTimeRequested = (payload, state) => ({
    ...state,
    durationInMinutes: calculateIncrementedDuration(state)
});

function calculateDecrementedDuration(state) {
    const diff = state.durationInMinutes - state.timeIncrementInMinutes;
    if (diff < state.timeIncrementInMinutes) {
        return max([state.durationInMinutes - 1, 0]);
    }
    return diff;
}

const onActualMeditationLessTimeRequested = (payload, state) => ({
    ...state,
    durationInMinutes: calculateDecrementedDuration(state)
});
//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [actualMeditationStartRequested.eventType]: onActualMeditationStartRequested,
    [actualMeditationResetRequested.eventType]: onActualMeditationResetRequested,
    [actualMeditationTimerTicked.eventType]: onActualMeditationTimerTicked,
    [actualMeditationMoreTimeRequested.eventType]: onActualMeditationAddTimeRequested,
    [actualMeditationLessTimeRequested.eventType]: onActualMeditationLessTimeRequested,

};
const keepState = (event, state) => state;
export const actualMeditationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);
