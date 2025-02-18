import {floor, flow, isUndefined, padStart} from 'lodash-es';

const getDurationInSeconds = (timerState) => timerState.durationInMinutes * 60;
const getRemainingSeconds = (timerState) => timerState.remainingSeconds;
const hasStarted = (timerState) => !isUndefined(timerState.startedTimeInSeconds);
const displayedTimeInSeconds = (timerState) => hasStarted(timerState) ? getRemainingSeconds(timerState) : getDurationInSeconds(timerState);
const formatSeconds = (seconds) => {
    const hours = floor(seconds / 3600);
    const hoursStr = padStart(String(hours), 2, '0');
    const minutesStr = padStart(String(floor((seconds % 3600) / 60)), 2, '0');
    const secondsStr = padStart(String(seconds % 60), 2, '0');
    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
};

const displayedTime = flow(displayedTimeInSeconds, formatSeconds);
const isTimeUp = (timerState) => getRemainingSeconds(timerState) === 0;
const isRunning = (timerState) => hasStarted(timerState) && !isTimeUp(timerState);
const getDurationInMinutes = (timerState) => getDurationInSeconds(timerState) / 60;
const canDurationBeSet = (timerState) => !hasStarted(timerState);
const hasCompleted = (timerState) => hasStarted(timerState) && isTimeUp(timerState);

export const actualMeditationSelectors = {
    hasStarted,
    hasCompleted,
    displayedTime,
    isRunning,
    getDurationInMinutes,
    isTimeUp,
    canDurationBeSet
};