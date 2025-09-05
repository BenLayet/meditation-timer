import { ACTUAL_MEDITATION_INITIAL_STATE } from "./actual-meditation.state.js";
import { actualMeditationChainedEvents } from "./actual-meditation.chained-events.js";
import { actualMeditationEvents } from "./actual-meditation.events.js";
import { actualMeditationSelectors } from "./actual-meditation.selectors.js";

export const actualMeditationComponent = {
  initialState: ACTUAL_MEDITATION_INITIAL_STATE,
  events: actualMeditationEvents,
  chainedEvents: actualMeditationChainedEvents,
  selectors: actualMeditationSelectors,
};
