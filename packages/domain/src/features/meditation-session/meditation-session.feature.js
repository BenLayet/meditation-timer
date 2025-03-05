import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionChainedEvents} from "./meditation-session.chained-events.js";

export const meditationSessionFeature = {
    effects: meditationSessionEffects,
    chainedEvents: meditationSessionChainedEvents,
};