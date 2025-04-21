import ow from "ow";
import {max} from "lodash-es";

const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? max([currentTimeInSeconds - state.startedTimeInSeconds, 0]) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, state.durationInSeconds - elapsedSeconds(currentTimeInSeconds)(state)]);
}

export const preparationEvents = {
    startRequested: {
        eventType: "startRequested",
        payloadShape: {
            requestedDurationInSeconds: ow.number.integer.positive,
            currentTimeInSeconds: ow.number.integer.positive,
        },
        handler: (state, {currentTimeInSeconds, requestedDurationInSeconds}) => ({
            ...state,
            durationInSeconds: requestedDurationInSeconds,
            remainingSeconds: requestedDurationInSeconds,
            startedTimeInSeconds: currentTimeInSeconds,
        }),
    },
    stopRequested: {
        eventType: "stopRequested",
        handler: (state) => ({
            ...state,
            durationInSeconds: null,
            remainingSeconds: null,
            startedTimeInSeconds: null,
        }),
    },
    timerStartRequested: {
        eventType: "timerStartRequested",
    },
    timerStopRequested: {
        eventType: "timerStopRequested",
    },
    timerTicked: {
        eventType: "timerTicked",
        payloadShape: {
            currentTimeInSeconds: ow.number.integer.positive,
        },
        handler: (state, {currentTimeInSeconds}) => ({
            ...state,
            remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
        })
    },
    moreTimeRequested: {
        eventType: "moreTimeRequested",
        handler: (state) => ({
            ...state,
            durationInSeconds: state.durationInSeconds + state.timeIncrementInSeconds,
            remainingSeconds: state.remainingSeconds + state.timeIncrementInSeconds,
        })
    },
    completed: {
        eventType: "completed",
        payloadShape: {
            currentTimeInSeconds: ow.number.integer.positive,
        },
        handler: (state) => ({
            ...state,
            remainingSeconds: 0,
        })
    },
    skipRequested: {
        eventType: "skipRequested",
        handler: (state) => ({
            ...state,
            durationInSeconds: 0,
            remainingSeconds: 0,
        })
    },
};
