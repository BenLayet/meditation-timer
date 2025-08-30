import { NEW_MEDITATION_INITIAL_STATE } from "./new-meditation.state.js";
import { newMeditationSelectors } from "./new-meditation.selectors.js";
import { newMeditationEvents } from "./new-meditation.events.js";
import { newMeditationChainedEvents } from "./new-meditation.chained-events.js";

export const newMeditationComponent = {
  initialState: NEW_MEDITATION_INITIAL_STATE,
  selectors: newMeditationSelectors,
  events: newMeditationEvents,
  chainedEvents: newMeditationChainedEvents,
};
