import {flow} from "lodash-es";
import {formatSeconds} from "../../lib/duration.function.js";

const isRunning = preparationState => !!preparationState.startedTimeInSeconds;
const durationInSeconds = preparationState => preparationState.durationInSeconds;
const remainingSeconds = preparationState => preparationState.remainingSeconds ?? 0;

const remainingTime = flow(remainingSeconds, formatSeconds);
const isTimeUp = preparationState => preparationState.remainingSeconds <= 0;
const timeIncrementInSeconds = preparationState => preparationState.timeIncrementInSeconds;
export const preparationSelectors = {
    isRunning,
    durationInSeconds,
    remainingTime,
    isTimeUp,
    timeIncrementInSeconds
};