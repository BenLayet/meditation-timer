import ow from "ow";
import {BEGINNING_OF_TIME_IN_MS} from "./timer.constant.js";

export const TIMER_TICKED = 'TIMER_TICKED';
export const TIMER_START_REQUESTED = 'TIMER_STARTED';
export const TIMER_STOP_REQUESTED = 'TIMER_STOPPED';
export const timerTicked = (currentTimestampInMs) => {
    ow(currentTimestampInMs, ow.number.integer.greaterThanOrEqual(BEGINNING_OF_TIME_IN_MS));
    return {
        type: TIMER_TICKED,
        payload: {currentTimestampInMs},
    };
};
export const timerStartRequested = () => {
    return {
        type: TIMER_START_REQUESTED,
    };
};

export const timerStopRequested = () => {
    return {
        type: TIMER_STOP_REQUESTED,
    };
};
