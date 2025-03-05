import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionChainedEvents} from "./meditation-session.chained-events.js";
import {actualMeditationFeature} from "../actual-meditation/actual-meditation.feature.js";
import {preparationFeature} from "../preparation/preparation.feature.js";

export const meditationSessionFeature = {
    effects: meditationSessionEffects,
    chainedEvents: meditationSessionChainedEvents,
    features: {
        preparation: preparationFeature,
        actualMeditation: actualMeditationFeature
    }
};