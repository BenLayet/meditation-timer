import { flow } from "lodash-es";
import { preparationSelectors } from "../preparation/preparation.selectors.js";
import { actualMeditationSelectors } from "../actual-meditation/actual-meditation.selectors.js";

const preparationState = (state) => state.children.preparation;
const actualMeditationState = (state) => state.children.actualMeditation;
const preparationIsRunning = flow(
  preparationState,
  preparationSelectors.isRunning,
);
const meditationIsRunning = flow(
  actualMeditationState,
  actualMeditationSelectors.isRunning,
);
const meditationRemainingTime = flow(
  actualMeditationState,
  actualMeditationSelectors.remainingTime,
);

export const meditationSessionSelectors = {
  preparationIsRunning,
  meditationIsRunning,
  meditationRemainingTime,
};
