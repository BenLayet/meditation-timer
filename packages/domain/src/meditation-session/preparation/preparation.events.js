import ow from "ow";

export const PREPARATION_STARTED = 'PREPARATION_STARTED';
export const preparationStarted = (currentTimestampInMs) => {
    ow(currentTimestampInMs, ow.number.integer.positive);
    return {
        type: PREPARATION_STARTED,
        payload: {currentTimestampInMs},
    };
};
