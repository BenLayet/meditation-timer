import {floor, max} from "lodash-es";
import {
    actualMeditationCancelRequested,
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "./actual-meditation.events.js";

export const ACTUAL_MEDITATION_INITIAL_STATE = {
    durationInMinutes: 20,
    startedTimeInSeconds: null,
    remainingSeconds: null,
};
//UTILITY
const durationInSeconds = state => {
    return state.durationInMinutes * 60;
}
const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? floor((currentTimeInSeconds - state.startedTimeInSeconds)) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state)]);
}

//REDUCERS
const onActualMeditationCancelRequested = () => ACTUAL_MEDITATION_INITIAL_STATE;
const onActualMeditationStartRequested = ({currentTimeInSeconds, durationInMinutes}, state) => ({
    ...state,
    durationInMinutes,
    startedTimeInSeconds: currentTimeInSeconds,
    remainingSeconds: durationInMinutes * 60,
});
const onActualMeditationTimerTicked = ({currentTimeInSeconds}, state) => ({
    ...state,
    remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
});

//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [actualMeditationStartRequested.eventType]: onActualMeditationStartRequested,
    [actualMeditationCancelRequested.eventType]: onActualMeditationCancelRequested,
    [actualMeditationTimerTicked.eventType]: onActualMeditationTimerTicked,
};
const keepState = (event, state) => state;
export const actualMeditationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);
