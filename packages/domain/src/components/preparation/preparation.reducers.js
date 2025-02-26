import {
    preparationCompleted,
    preparationStartRequested,
    preparationStopRequested,
    preparationTimerTicked
} from "./preparation.events.js";
import {floor, max} from "lodash-es";

const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? floor((currentTimeInSeconds - state.startedTimeInSeconds)) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, state.durationInSeconds - elapsedSeconds(currentTimeInSeconds)(state)]);
}
const onPreparationStartRequested = ({currentTimeInSeconds}, state) => ({
    ...state,
    startedTimeInSeconds: currentTimeInSeconds,
    remainingSeconds: state.durationInSeconds,
});
const onPreparationCompleted = (payload, state) => ({
    durationInSeconds: state.durationInSeconds,
});
const onPreparationStopRequested = (payload, state) => ({
    durationInSeconds: state.durationInSeconds,
});

const onPreparationTimerTicked = ({currentTimeInSeconds}, state) => ({
    ...state,
    remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
});


//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [preparationStartRequested.eventType]: onPreparationStartRequested,
    [preparationCompleted.eventType]: onPreparationCompleted,
    [preparationTimerTicked.eventType]: onPreparationTimerTicked,
    [preparationStopRequested.eventType]: onPreparationStopRequested,
};
const keepState = (event, state) => state;
export const preparationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);