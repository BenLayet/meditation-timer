import ow from "ow";

export const PREPARATION_STARTED = 'PREPARATION_STARTED';
export const preparationStarted = (currentTimestampInSeconds) => {
    ow(currentTimestampInSeconds, ow.number.integer.positive);
    return {
        type: PREPARATION_STARTED,
        payload: {currentTimestampInSeconds},
    };
};
