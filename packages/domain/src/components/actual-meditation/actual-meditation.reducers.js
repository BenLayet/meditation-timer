import {floor, max} from "lodash-es";
import {actualMeditationEvents} from "./actual-meditation.events.js";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "./actual-meditation.state.js";

//utility
const durationInSeconds = state => {
    return state.durationInMinutes * 60;
}
const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? floor((currentTimeInSeconds - state.startedTimeInSeconds)) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state)]);
}

//event handlers
export const actualMeditationEventHandlers = new Map();
actualMeditationEventHandlers.set(actualMeditationEvents.cancelRequested, () => ACTUAL_MEDITATION_INITIAL_STATE);
actualMeditationEventHandlers.set(actualMeditationEvents.startRequested, (state, {
    currentTimeInSeconds,
    durationInMinutes
}) => ({
    ...state, durationInMinutes, startedTimeInSeconds: currentTimeInSeconds, remainingSeconds: durationInMinutes * 60,
}));
actualMeditationEventHandlers.set(actualMeditationEvents.timerTicked, (state, {currentTimeInSeconds}) => ({
    ...state, remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
}));
actualMeditationEventHandlers.set(actualMeditationEvents.timerTicked, (state, {currentTimeInSeconds}) => ({
    ...state, remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
}));

