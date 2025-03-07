import {floor, flow} from 'lodash-es';
import {formatSeconds} from "../../lib/duration.function.js";

const durationInSeconds = (state) => state.durationInMinutes * 60;
const getRemainingSeconds = (state) => state.remainingSeconds;
const hasStarted = (state) => !!state.startedTimeInSeconds;
const displayedTimeInSeconds = (state) => hasStarted(state) ? getRemainingSeconds(state) : durationInSeconds(state);

const displayedTime = flow(displayedTimeInSeconds, formatSeconds);
const isTimeUp = (state) => getRemainingSeconds(state) === 0;
const isRunning = (state) => hasStarted(state) && !isTimeUp(state);
const durationInMinutes = (state) => durationInSeconds(state) / 60;
const hasCompleted = (state) => hasStarted(state) && isTimeUp(state);

const elapsedTimeInSeconds = (state) => durationInSeconds(state) - getRemainingSeconds(state);
const elapsedTimeInMinutes = (state) => floor(elapsedTimeInSeconds(state) / 60);

const meditationToSave = (state) => ({
    startedTimeInSeconds: state.startedTimeInSeconds,
    durationInMinutes: elapsedTimeInMinutes(state)
});

export const actualMeditationSelectors = {
    hasStarted,
    hasCompleted,
    remainingTime: displayedTime,
    isRunning,
    durationInMinutes,
    durationInSeconds,
    isTimeUp,
    meditationToSave
};