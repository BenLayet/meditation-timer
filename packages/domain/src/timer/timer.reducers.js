export const onTimerStarted = ({currentTimestampInSeconds}, state) => ({
        ...state,
        startedTimestampInSecond: currentTimestampInSeconds,
    });
export const onTimerTicked = ({currentTimestampInSeconds}, state) => ({
    ...state,
    remainingSeconds: calculateRemainingSeconds(state.durationInSeconds, currentTimestampInSeconds, state.startedTimestampInSecond),

});
function calculateRemainingSeconds(durationInSeconds, currentTimestampInSeconds, startedTimestampInSecond) {
    return Math.max(0,  durationInSeconds - (currentTimestampInSeconds - startedTimestampInSecond));
}