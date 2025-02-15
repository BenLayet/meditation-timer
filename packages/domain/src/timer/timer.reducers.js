import {floor, max} from "lodash-es";

const onTimerStarted = ({currentTimestampInMs}, state) => ({
    ...state,
    startedTimestampInMs: currentTimestampInMs,
    remainingSeconds: state.durationInSeconds,
});
const onTimerTicked = ({currentTimestampInMs}, state) => ({
    ...state,
    remainingSeconds: calculateRemainingSeconds(state.durationInSeconds, currentTimestampInMs, state.startedTimestampInMs),

});
const onDurationSet = ({durationInMinutes}, state) => ({
    ...state,
    durationInSeconds: durationInMinutes * 60,
});

function calculateRemainingSeconds(durationInSeconds, currentTimestampInMs, startedTimestampInMs) {
    return max([0, durationInSeconds - floor((currentTimestampInMs - startedTimestampInMs) / 1000)]);
}

export const timerReducers = {
    onTimerStarted,
    onTimerTicked,
    onDurationSet
};
