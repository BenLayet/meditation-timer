import ow from "ow";
import {floor, max} from "lodash-es";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "./actual-meditation.state.js";

//utility
const durationInSeconds = state => {
    return state.durationInMinutes * 60;
}
const elapsedSeconds = currentTimeInSeconds => state => {
    return state.startedTimeInSeconds ? floor((currentTimeInSeconds - state.startedTimeInSeconds)) : 0;
}
const remainingSeconds = currentTimeInSeconds => state => {
    return max([0, durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state)]);
}

//event handlers
export const actualMeditationEvents = {
    startRequested: {
        eventType: "startRequested", payloadShape: {
            currentTimeInSeconds: ow.number.integer.positive, durationInMinutes: ow.number.integer.positive,
        }, handler: (state, {currentTimeInSeconds, durationInMinutes}) => ({
            ...state,
            durationInMinutes,
            startedTimeInSeconds: currentTimeInSeconds,
            remainingSeconds: durationInMinutes * 60,
        })
    },
    stopRequested: {
        eventType: "stopRequested", handler: () => ACTUAL_MEDITATION_INITIAL_STATE
    },
    completed: {eventType: "completed"},
    timerTicked: {
        eventType: "timerTicked", payloadShape: {
            currentTimeInSeconds: ow.number.integer.positive,
        }, handler: (state, {currentTimeInSeconds}) => ({
            ...state, remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
        })
    },
    timerStartRequested: {eventType: "timerStartRequested"},
    timerStopRequested: {eventType: "timerStopRequested"},
    saveRequested: {
        eventType: "saveRequested",
        payloadShape: {
            startedTimeInSeconds: ow.number.positive,
            durationInMinutes: ow.number.greaterThanOrEqual(0)
        }
    },
    saveFailed: {
        eventType: "saveFailed", payloadShape: {
            error: ow.any
        }
    },
    saveSucceeded: {eventType: "saveSucceeded"},
}