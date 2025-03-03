import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionReducers} from "./meditation-session.reducers.js";
import {meditationSessionSelectors} from "./meditation-session.selectors.js";

export const meditationSessionComponent = {
    effects: meditationSessionEffects,
    reducers: meditationSessionReducers,
    selectors: meditationSessionSelectors,
};