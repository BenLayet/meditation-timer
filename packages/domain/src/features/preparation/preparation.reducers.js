import {
    moreTimeDuringPreparationRequested,
    preparationFinished,
    preparationStartRequested,
    preparationTimerTicked,
    skipPreparationRequested
} from "./preparation.events.js";
import {max} from "lodash-es";
import {PREPARATION_INITIAL_STATE} from "./preparation.state.js";

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
const onSkipPreparationRequested = (payload, state) => ({
    ...state,
    durationInSeconds: 0,
    remainingSeconds: 0,
});

export const preparationEventHandlers = {
    [preparationStartRequested.eventType]: onPreparationStartRequested,
    [preparationFinished.eventType]: onPreparationFinished,
    [preparationTimerTicked.eventType]: onPreparationTimerTicked,
    [moreTimeDuringPreparationRequested.eventType]: onMoreTimeDuringPreparationRequested,
    [skipPreparationRequested.eventType]: onSkipPreparationRequested,
};