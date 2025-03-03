import {
    moreTimeDuringPreparationRequested,
    preparationFinished,
    preparationStartRequested,
    preparationTimerTicked
} from "./preparation.events.js";
import {max} from "lodash-es";

export const PREPARATION_INITIAL_STATE = {
    timeIncrementInSeconds: 20,
};

const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? max([currentTimeInSeconds - state.startedTimeInSeconds, 0]) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, state.durationInSeconds - elapsedSeconds(currentTimeInSeconds)(state)]);
}

const onPreparationStartRequested = ({currentTimeInSeconds, requestedDurationInSeconds}, state) => ({
    ...state,
    durationInSeconds: requestedDurationInSeconds,
    remainingSeconds: requestedDurationInSeconds,
    startedTimeInSeconds: currentTimeInSeconds,
});
const onPreparationFinished = () => PREPARATION_INITIAL_STATE;

const onPreparationTimerTicked = ({currentTimeInSeconds}, state) => ({
    ...state,
    remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
});
const onMoreTimeDuringPreparationRequested = (payload, state) => ({
    ...state,
    durationInSeconds: state.durationInSeconds + state.timeIncrementInSeconds,
    remainingSeconds: state.remainingSeconds + state.timeIncrementInSeconds,
});

//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [preparationStartRequested.eventType]: onPreparationStartRequested,
    [preparationFinished.eventType]: onPreparationFinished,
    [preparationTimerTicked.eventType]: onPreparationTimerTicked,
    [moreTimeDuringPreparationRequested.eventType]: onMoreTimeDuringPreparationRequested,
};
const keepState = (event, state) => state;
export const preparationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);