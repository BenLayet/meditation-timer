import {actualMeditationEffects} from "./actual-meditation.effects.js";
import {ACTUAL_MEDITATION_INITIAL_STATE, actualMeditationEventHandlers} from "./actual-meditation.state.js";
import {actualMeditationSelectors} from "./actual-meditation.selectors.js";
import {actualMeditationChainedEvents} from "./actual-meditation.chained-events.js";

export const actualMeditationFeature = {
    initialState: ACTUAL_MEDITATION_INITIAL_STATE,
    effects: actualMeditationEffects,
    eventHandlers: actualMeditationEventHandlers,
    selectors: actualMeditationSelectors,
    chainedEvents: actualMeditationChainedEvents,
};