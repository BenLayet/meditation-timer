import { map } from "../../lib/functions/object.functions.js";
import { flow } from "lodash-es";
import { meditationSettingsSelectors } from "../meditation-settings/meditation-settings.selectors.js";
import { not } from "../../lib/functions/predicate.functions.js";
import { newMeditationSelectors } from "../new-meditation/new-meditation.selectors.js";

const currentPage = (state) => state.currentPage;

const ownStateSelectors = {
  currentPage,
};
//TODO remove this when the app is refactored
const newMeditationState = (compositeState) =>
  compositeState.children.newMeditation;
const meditationDurationInMinutes = flow(
  newMeditationState,
  newMeditationSelectors.meditationDurationInMinutes,
);

const meditationSettingsState = (compositeState) =>
  compositeState.children.meditationSettings;
const isGongOn = flow(
  meditationSettingsState,
  meditationSettingsSelectors.isGongOff,
  not,
);
const preparationDurationInSeconds = flow(
  meditationSettingsState,
  meditationSettingsSelectors.preparationDurationInSeconds,
);

const ownState = (compositeState) => compositeState.ownState;

export const meditationTimerAppSelectors = {
  ...map(ownStateSelectors, (selector) => flow(ownState, selector)),
  isGongOn,
  meditationDurationInMinutes,
  preparationDurationInSeconds,
};
