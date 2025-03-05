import {actualMeditationEffects} from "./actual-meditation.effects.js";
import {actualMeditationEventHandlers} from "./actual-meditation.state.js";
import {actualMeditationSelectors} from "./actual-meditation.selectors.js";
import {actualMeditationChainedEvents} from "./actual-meditation.chained-events.js";

export const actualMeditationFeature = {
    effects: actualMeditationEffects,
    eventHandlers: actualMeditationEventHandlers,
    selectors: actualMeditationSelectors,
    chainedEvents: actualMeditationChainedEvents,
};