import ow from "ow";

export const actualMeditationEvents = {
    startRequested: {
        currentTimeInSeconds: ow.number.integer.positive,
        durationInMinutes: ow.number.integer.positive,
    },
    cancelRequested: {},
    completed: {},
    stopped: {},
    timerTicked: {
        currentTimeInSeconds: ow.number.integer.positive,
    },
    saveRequested: {},
    saveFailed: {
        error: ow.string
    },
    saveSucceeded: {},
}