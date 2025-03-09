import {preparationEvents} from "./preparation.events.js";
import {max} from "lodash-es";
import {PREPARATION_INITIAL_STATE} from "./preparation.state.js";

const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? max([currentTimeInSeconds - state.startedTimeInSeconds, 0]) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, state.durationInSeconds - elapsedSeconds(currentTimeInSeconds)(state)]);
}

//event handlers
export const preparationEventHandlers = new Map();
preparationEventHandlers.set(
    preparationEvents.startRequested,
    (state, {currentTimeInSeconds, requestedDurationInSeconds}) => ({
        ...state,
        durationInSeconds: requestedDurationInSeconds,
        remainingSeconds: requestedDurationInSeconds,
        startedTimeInSeconds: currentTimeInSeconds,
    })
);
preparationEventHandlers.set(
    preparationEvents.finished,
    () => PREPARATION_INITIAL_STATE
);
preparationEventHandlers.set(
    preparationEvents.timerTicked,
    (state, {currentTimeInSeconds}) => ({
        ...state,
        remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
    })
);
preparationEventHandlers.set(
    preparationEvents.moreTimeRequested,
    (state) => ({
        ...state,
        durationInSeconds: state.durationInSeconds + state.timeIncrementInSeconds,
        remainingSeconds: state.remainingSeconds + state.timeIncrementInSeconds,
    })
);
preparationEventHandlers.set(
    preparationEvents.skipRequested,
    (state) => ({
        ...state,
        durationInSeconds: 0,
        remainingSeconds: 0,
    })
);
