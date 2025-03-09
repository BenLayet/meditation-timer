import ow from "ow";

export const preparationEvents = {
    startRequested: {
        requestedDurationInSeconds: ow.number.integer.positive,
        currentTimeInSeconds: ow.number.integer.positive,
    },
    timerTicked: {
        currentTimeInSeconds: ow.number.integer.positive,
    },
    moreTimeRequested: {},
    completed: {
        currentTimeInSeconds: ow.number.integer.positive,
    },
    skipRequested: {},
    finished: {},
};

