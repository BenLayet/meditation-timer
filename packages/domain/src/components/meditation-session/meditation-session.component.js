import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionEventHandlers} from "./meditation-session.reducers.js";
import {meditationSessionSelectors} from "./meditation-session.selectors.js";

export const meditationSessionComponent = {
    effects: meditationSessionEffects,
    eventHandlers: meditationSessionEventHandlers,
    selectors: meditationSessionSelectors,
};