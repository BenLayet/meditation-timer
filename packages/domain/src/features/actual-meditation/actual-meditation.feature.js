import {actualMeditationEffects} from "./actual-meditation.effects.js";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "./actual-meditation.state.js";
import {actualMeditationChainedEvents} from "./actual-meditation.chained-events.js";
import {actualMeditationEventHandlers} from "./actual-meditation.reducers.js";

export const actualMeditationFeature = {
    initialState: ACTUAL_MEDITATION_INITIAL_STATE,
    effects: actualMeditationEffects,
    eventHandlers: actualMeditationEventHandlers,
    chainedEvents: actualMeditationChainedEvents,
};