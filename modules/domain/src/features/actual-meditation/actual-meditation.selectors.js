import { floor, flow } from "lodash-es";
import { formatSeconds } from "@softersoftware/functions/duration.functions";
import { map } from "@softersoftware/functions/object.functions";

const durationInSeconds = (state) => state.durationInMinutes * 60;
const getRemainingSeconds = (state) => state.remainingSeconds;
const hasStarted = (state) => !!state.startedTimeInSeconds;
const displayedTimeInSeconds = (state) =>
  hasStarted(state) ? getRemainingSeconds(state) : durationInSeconds(state);

const remainingTime = flow(displayedTimeInSeconds, formatSeconds);
const isTimeUp = (state) => getRemainingSeconds(state) === 0;
const isRunning = (state) => hasStarted(state) && !isTimeUp(state);

const elapsedTimeInSeconds = (state) =>
  durationInSeconds(state) - getRemainingSeconds(state);
const elapsedTimeInMinutes = (state) => floor(elapsedTimeInSeconds(state) / 60);

const meditationToSave = (state) => ({
  startedTimeInSeconds: state.startedTimeInSeconds,
  durationInMinutes: elapsedTimeInMinutes(state),
});

const ownStateSelectors = {
  remainingTime,
  isRunning,
  isTimeUp,
  meditationToSave,
};

const ownState = (compositeState) => compositeState.ownState;
export const actualMeditationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
