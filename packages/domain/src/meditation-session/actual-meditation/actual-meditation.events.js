import ow from "ow";

export const ACTUAL_MEDITATION_STARTED = 'ACTUAL_MEDITATION_STARTED';
export const ACTUAL_MEDITATION_COMPLETED = 'ACTUAL_MEDITATION_COMPLETED';
export const actualMeditationStarted = (currentTimestampInMs) => {
    ow(currentTimestampInMs, ow.number.integer.positive);
    return {
        type: ACTUAL_MEDITATION_STARTED,
        payload: {currentTimestampInMs},
    };
};
export const actualMeditationCompleted = (currentTimestampInMs) => {
    ow(currentTimestampInMs, ow.number.integer.positive);
    return {
        type: ACTUAL_MEDITATION_COMPLETED,
        payload: {currentTimestampInMs},
    };
};
