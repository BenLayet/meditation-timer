//exposed selectors
export const hasTimerStarted = (timerState) => typeof timerState.startedTimestampMs !== 'undefined';
export const isTimeUp = (timerState) => getRemainingSeconds(timerState) === 0;
export const isTimerRunning = (timerState) => hasTimerStarted(timerState) && !isTimeUp(timerState);
export const getFormattedTime = (timerState) => formatSeconds(getRemainingSeconds(timerState));

//private selectors
function getRemainingSeconds(timerState){
    const elapsedSeconds = timerState.lastTickTimestampMs ? Math.floor((timerState.lastTickTimestampMs - timerState.startedTimestampMs) / 1000):0;
    return Math.max(0, timerState.totalSeconds - elapsedSeconds);
}
function formatSeconds (seconds) {
    const hours = Math.floor(seconds / 3600);
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secondsStr = String(seconds % 60).padStart(2, '0');
    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
}