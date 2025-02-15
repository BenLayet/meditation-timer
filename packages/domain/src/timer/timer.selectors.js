import {floor, flow, isUndefined, padStart} from 'lodash-es';

const getDurationInSeconds = (timerState) => timerState.durationInSeconds;
const getRemainingSeconds = (timerState) => timerState.remainingSeconds;
const hasTimerStarted = (timerState) => !isUndefined(timerState.startedTimestampInMs);
const getTimeToDisplayInSeconds = (timerState) => hasTimerStarted(timerState) ? getRemainingSeconds(timerState) : getDurationInSeconds(timerState);
const formatSeconds = (seconds) => {
    const hours = floor(seconds / 3600);
    const hoursStr = padStart(String(hours), 2, '0');
    const minutesStr = padStart(String(floor((seconds % 3600) / 60)), 2, '0');
    const secondsStr = padStart(String(seconds % 60), 2, '0');
    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
};

const getFormattedTimeToDisplay = flow(
    getTimeToDisplayInSeconds,
    formatSeconds
);
const isTimeUp = (timerState) => getRemainingSeconds(timerState) === 0;
const isTimerRunning = (timerState) => hasTimerStarted(timerState) && !isTimeUp(timerState);
const getDurationInMinutes = (timerState) => getDurationInSeconds(timerState) / 60;

export const timerSelectors = {
    getFormattedTimeToDisplay,
    isTimerRunning,
    getDurationInMinutes,
    isTimeUp
};