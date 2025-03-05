import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionEventHandlers} from "./meditation-session.state.js";
import {meditationSessionSelectors} from "./meditation-session.selectors.js";

export const meditationSessionFeature = {
    effects: meditationSessionEffects,
    eventHandlers: meditationSessionEventHandlers,
    selectors: meditationSessionSelectors,
};