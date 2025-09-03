import { flow } from "lodash-es";
import { formatSeconds } from "@softersoftware/functions/duration.functions.js";
import { map } from "@softersoftware/functions/object.functions.js";

//SELECTORS
const meditationDurationInMinutes = (state) =>
  state.meditationDurationInMinutes;
const meditationDurationInSeconds = (state) =>
  meditationDurationInMinutes(state) * 60;
const meditationDuration = flow(meditationDurationInSeconds, formatSeconds);

const ownStateSelectors = {
  meditationDuration,
  meditationDurationInMinutes,
};
const ownState = (compositeState) => compositeState.ownState;
export const newMeditationSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
