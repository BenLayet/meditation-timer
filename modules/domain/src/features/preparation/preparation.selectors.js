import { flow } from "lodash-es";
import { formatSeconds } from "@softer-software/functions/duration.functions.js";
import { map } from "@softer-software/functions/object.functions.js";
import { and, not } from "@softer-software/functions/predicate.functions.js";

const hasStarted = (preparationState) =>
  !!preparationState.startedTimeInSeconds;
const durationInSeconds = (preparationState) =>
  preparationState.durationInSeconds;
const remainingSeconds = (preparationState) =>
  preparationState.remainingSeconds ?? 0;

const remainingTime = flow(remainingSeconds, formatSeconds);
const isTimeUp = (preparationState) => preparationState.remainingSeconds <= 0;
const timeIncrementInSeconds = (preparationState) =>
  preparationState.timeIncrementInSeconds;
const isRunning = and(hasStarted, not(isTimeUp));
const ownStateSelectors = {
  isRunning,
  durationInSeconds,
  remainingTime,
  isTimeUp,
  timeIncrementInSeconds,
};
const ownState = (compositeState) => compositeState.ownState;
export const preparationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
