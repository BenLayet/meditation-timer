import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionChainedEvents} from "./meditation-session.chained-events.js";
import {actualMeditationFeature} from "../actual-meditation/actual-meditation.feature.js";
import {preparationFeature} from "../preparation/preparation.feature.js";
import {createSelectors} from "../../lib/feature-selector.js";
import {preparationSelectors} from "../preparation/preparation.selectors.js";
import {flow} from "lodash-es";
import {actualMeditationSelectors} from "../actual-meditation/actual-meditation.selectors.js";

const subFeatures = {
    preparation: preparationFeature,
    actualMeditation: actualMeditationFeature
};
const {preparation, actualMeditation} = createSelectors(subFeatures);

const preparationState = state => state.preparation;
const actualMeditationState = state => state.actualMeditation;
const preparationIsRunning = flow(preparationState, preparationSelectors.isRunning);
const meditationIsRunning = flow(actualMeditationState, actualMeditationSelectors.isRunning);
const meditationRemainingTime = flow(actualMeditationState, actualMeditationSelectors.remainingTime);

export const meditationSessionSelectors = {
    preparationState,
    preparationIsRunning,
    meditationIsRunning,
    meditationRemainingTime
};

export const meditationSessionFeature = {
    effects: meditationSessionEffects,
    chainedEvents: meditationSessionChainedEvents,
    subFeatures,
    selectors: {preparation, actualMeditation}
};