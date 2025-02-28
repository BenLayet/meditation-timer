import {floor, flow, isUndefined, padStart} from "lodash-es";

const isRunning = preparationState => !isUndefined(preparationState.startedTimeInSeconds);
const durationInSeconds = preparationState => preparationState.durationInSeconds;
const remainingTime = preparationState => preparationState.remainingSeconds || 0;
const formatSeconds = seconds => {
    const minutesStr = padStart(String(floor(seconds / 60)), 2, '0');
    const secondsStr = padStart(String(seconds % 60), 2, '0');
    return `${minutesStr}:${secondsStr}`;
};
const displayedTime = flow(remainingTime, formatSeconds);
const isTimeUp = preparationState => preparationState.remainingSeconds <= 0;
export const preparationSelectors = {
    isRunning,
    durationInSeconds,
    displayedTime,
    isTimeUp
};