import {actualMeditationEffects} from "./actual-meditation.effects.js";
import {actualMeditationEventHandlers} from "./actual-meditation.reducers.js";
import {actualMeditationSelectors} from "./actual-meditation.selectors.js";

export const actualMeditationComponent = {
    effects: actualMeditationEffects,
    eventHandlers: actualMeditationEventHandlers,
    selectors: actualMeditationSelectors
};