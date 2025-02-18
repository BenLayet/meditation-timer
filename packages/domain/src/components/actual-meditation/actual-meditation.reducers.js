import {floor, max} from "lodash-es";
import {
    actualMeditationDurationSet,
    actualMeditationResetRequested,
    actualMeditationStartRequested,
    actualMeditationTimerTicked
} from "./actual-meditation.events.js";
import ow from "ow";

const durationInSeconds = state => {
    ow(state.durationInMinutes, ow.number.integer.greaterThanOrEqual(0));
    return state.durationInMinutes * 60;
}
const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? floor((currentTimeInSeconds - state.startedTimeInSeconds)) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state)]);
}
const onActualMeditationResetRequested = (payload, state) => ({
    durationInMinutes: state.durationInMinutes,
});
const onActualMeditationStartRequested = ({currentTimeInSeconds}, state) => ({
    ...state,
    startedTimeInSeconds: currentTimeInSeconds,
    remainingSeconds: durationInSeconds(state),
});
const onActualMeditationTimerTicked = ({currentTimeInSeconds}, state) => ({
    ...state,
    remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
});

const onActualMeditationDurationSet = ({durationInMinutes}) => ({
    durationInMinutes
});
//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [actualMeditationStartRequested.eventType]: onActualMeditationStartRequested,
    [actualMeditationResetRequested.eventType]: onActualMeditationResetRequested,
    [actualMeditationTimerTicked.eventType]: onActualMeditationTimerTicked,
    [actualMeditationDurationSet.eventType]: onActualMeditationDurationSet,
};
const keepState = (event, state) => state;
export const actualMeditationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);