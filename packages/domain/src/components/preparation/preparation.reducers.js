import {
    preparationCompleted,
    preparationLessTimeRequested,
    preparationMoreTimeRequested,
    preparationStartRequested,
    preparationStopRequested,
    preparationTimerTicked
} from "./preparation.events.js";
import {max} from "lodash-es";

export const PREPARATION_INITIAL_STATE = {
    defaultDurationInSeconds: 20,
    timeIncrementInSeconds: 10,
};

const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? max([currentTimeInSeconds - state.startedTimeInSeconds, 0]) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, state.durationInSeconds - elapsedSeconds(currentTimeInSeconds)(state)]);
}


const onPreparationStartRequested = ({currentTimeInSeconds}, state) => ({
    ...state,
    durationInSeconds: state.defaultDurationInSeconds,
    remainingSeconds: state.defaultDurationInSeconds,
    startedTimeInSeconds: currentTimeInSeconds,
});
const onPreparationCompleted = () => PREPARATION_INITIAL_STATE;
const onPreparationStopRequested = () => PREPARATION_INITIAL_STATE;

const onPreparationTimerTicked = ({currentTimeInSeconds}, state) => ({
    ...state,
    remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
});
const onPreparationMoreTimeRequested = (payload, state) => ({
    ...state,
    durationInSeconds: state.durationInSeconds + state.timeIncrementInSeconds,
    remainingSeconds: state.remainingSeconds + state.timeIncrementInSeconds,
});
const onPreparationLessTimeRequested = (payload, state) => ({
    ...state,
    durationInSeconds: max([state.durationInSeconds - state.timeIncrementInSeconds, 0]),
    remainingSeconds: max([state.remainingSeconds - state.timeIncrementInSeconds, 0]),
});


//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [preparationStartRequested.eventType]: onPreparationStartRequested,
    [preparationCompleted.eventType]: onPreparationCompleted,
    [preparationTimerTicked.eventType]: onPreparationTimerTicked,
    [preparationStopRequested.eventType]: onPreparationStopRequested,
    [preparationMoreTimeRequested.eventType]: onPreparationMoreTimeRequested,
    [preparationLessTimeRequested.eventType]: onPreparationLessTimeRequested,
};
const keepState = (event, state) => state;
export const preparationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);