import ow from "ow";

export const TIMER_TICKED = 'TIMER_TICKED';
export const timerTicked = (currentTimestampInSeconds) => {
    ow(currentTimestampInSeconds, ow.number.integer.positive);
    return {
        type: TIMER_TICKED,
        payload: {currentTimestampInSeconds},
    };
};
