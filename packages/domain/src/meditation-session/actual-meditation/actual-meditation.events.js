import ow from "ow";

export const ACTUAL_MEDITATION_STARTED = 'ACTUAL_MEDITATION_STARTED';
export const ACTUAL_MEDITATION_COMPLETED = 'ACTUAL_MEDITATION_COMPLETED';
export const actualMeditationStarted = (currentTimestampInSeconds) => {
    ow(currentTimestampInSeconds, ow.number.integer.positive);
    return {
        type: ACTUAL_MEDITATION_STARTED,
        payload: {currentTimestampInSeconds},
    };
};
export const actualMeditationCompleted = (currentTimestampInSeconds) => {
    ow(currentTimestampInSeconds, ow.number.integer.positive);
    return {
        type: ACTUAL_MEDITATION_COMPLETED,
        payload: {currentTimestampInSeconds},
    };
};
