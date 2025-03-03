import {flow} from "lodash-es";
import {formatSeconds} from "../../lib/duration.function.js";

const isRunning = preparationState => !!preparationState.startedTimeInSeconds;
const durationInSeconds = preparationState => preparationState.durationInSeconds;
const remainingTime = preparationState => preparationState.remainingSeconds || 0;

const displayedTime = flow(remainingTime, formatSeconds);
const isTimeUp = preparationState => preparationState.remainingSeconds <= 0;
export const preparationSelectors = {
    isRunning,
    durationInSeconds,
    displayedTime,
    isTimeUp
};