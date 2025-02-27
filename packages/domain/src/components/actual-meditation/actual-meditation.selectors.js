import {floor, flow, isUndefined, padStart} from 'lodash-es';

const getDurationInSeconds = (state) => state.durationInMinutes * 60;
const getRemainingSeconds = (state) => state.remainingSeconds;
const hasStarted = (state) => !isUndefined(state.startedTimeInSeconds);
const displayedTimeInSeconds = (state) => hasStarted(state) ? getRemainingSeconds(state) : getDurationInSeconds(state);
const formatSeconds = (seconds) => {
    const hours = floor(seconds / 3600);
    const hoursStr = padStart(String(hours), 2, '0');
    const minutesStr = padStart(String(floor((seconds % 3600) / 60)), 2, '0');
    const secondsStr = padStart(String(seconds % 60), 2, '0');
    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
};

const displayedTime = flow(displayedTimeInSeconds, formatSeconds);
const isTimeUp = (state) => getRemainingSeconds(state) === 0;
const isRunning = (state) => hasStarted(state) && !isTimeUp(state);
const getDurationInMinutes = (state) => getDurationInSeconds(state) / 60;
const hasCompleted = (state) => hasStarted(state) && isTimeUp(state);

export const actualMeditationSelectors = {
    hasStarted,
    hasCompleted,
    displayedTime,
    isRunning,
    getDurationInMinutes,
    isTimeUp,
};