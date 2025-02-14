const onTimerStarted = ({currentTimestampInSeconds}, state) => ({
    ...state,
    startedTimestampInSecond: currentTimestampInSeconds,
});
const onTimerTicked = ({currentTimestampInSeconds}, state) => ({
    ...state,
    remainingSeconds: calculateRemainingSeconds(state.durationInSeconds, currentTimestampInSeconds, state.startedTimestampInSecond),

});
const onDurationSet = ({durationInMinutes}, state) => ({
    ...state,
    durationInSeconds: durationInMinutes * 60,
    remainingSeconds: durationInMinutes * 60,
});

function calculateRemainingSeconds(durationInSeconds, currentTimestampInSeconds, startedTimestampInSecond) {
    return Math.max(0, durationInSeconds - (currentTimestampInSeconds - startedTimestampInSecond));
}

export const timerReducers = {
    onTimerStarted,
    onTimerTicked,
    onDurationSet
};
