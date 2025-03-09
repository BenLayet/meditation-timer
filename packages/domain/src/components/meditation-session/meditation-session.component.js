import {meditationSessionEffects} from "./meditation-session.effects.js";
import {meditationSessionChainedEvents} from "./meditation-session.chained-events.js";
import {actualMeditationComponent} from "../actual-meditation/actual-meditation.component.js";
import {preparationComponent} from "../preparation/preparation.component.js";

export const meditationSessionComponent = {
    effects: meditationSessionEffects,
    chainedEvents: meditationSessionChainedEvents,
    subComponents: {
        preparation: preparationComponent,
        actualMeditation: actualMeditationComponent
    },
};