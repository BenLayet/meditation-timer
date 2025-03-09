import ow from "ow";

export const meditationSessionEvents = {
    startRequested: {
        currentTimeInSeconds: ow.number.integer.positive,
    },
    stopRequested: {},
    completed: {},
    finished: {},
}