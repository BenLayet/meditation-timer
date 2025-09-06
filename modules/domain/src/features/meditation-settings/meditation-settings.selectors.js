import { flow } from "lodash-es";
import { formatSeconds } from "@softersoftware/functions/duration.functions";
import { map } from "@softersoftware/functions/object.functions";
import { not } from "@softersoftware/functions/predicate.functions";

//SELECTORS
const meditationDurationInMinutes = (state) =>
  state.meditationDurationInMinutes;
const meditationDurationInSeconds = (state) =>
  meditationDurationInMinutes(state) * 60;
const preparationDurationInSeconds = (state) =>
  state.preparationDurationInSeconds;
const meditationDuration = flow(meditationDurationInSeconds, formatSeconds);
const preparationDuration = flow(preparationDurationInSeconds, formatSeconds);
const isGongOff = (state) => state.gongOff;
const isGongOn = not(isGongOff);

const ownStateSelectors = {
  isGongOn,
  isGongOff,
  meditationDuration,
  preparationDuration,
  meditationDurationInMinutes,
  preparationDurationInSeconds,
};
const ownState = (compositeState) => compositeState.ownState;
export const meditationSettingsSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
