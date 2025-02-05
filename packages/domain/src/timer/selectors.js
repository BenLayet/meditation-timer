//exposed selectors
export const isTimeUp = (timerState) => getRemainingSeconds(timerState) === 0;
export const isTimerRunning = (timerState) => hasStarted(timerState) && !isTimeUp(timerState);
export const getFormattedTime = (timerState) => formatSeconds(getRemainingSeconds(timerState));

//private selectors
function hasStarted(timerState){
    return typeof timerState.startedTimestampMs !== 'undefined';
}
function getRemainingSeconds(timerState){
    const elapsedSeconds = Math.floor((timerState.lastTickTimestampMs - timerState.startedTimestampMs) / 1000);
    return timerState.totalSeconds - elapsedSeconds;
}
function formatSeconds (seconds) {
    const hours = Math.floor(seconds / 3600);
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secondsStr = String(seconds % 60).padStart(2, '0');
    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
}