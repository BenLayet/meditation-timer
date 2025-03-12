import ow from "ow";

export const meditationSessionEvents = {
    startRequested: {
        eventType: "startRequested",
        payloadShape: {
            currentTimeInSeconds: ow.number.integer.positive,
        }
    },
    stopRequested: {
        eventType: "stopRequested",
    },
    completed: {
        eventType: "completed",
    },
    finished: {
        eventType: "finished",
    },
    disableSleepModeRequested: {
        eventType: "disableSleepModeRequested",
    },
    enableSleepModeRequested: {
        eventType: "enableSleepModeRequested",
    },

}