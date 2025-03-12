import {meditationSessionChainedEvents} from "./meditation-session.chained-events.js";
import {actualMeditationComponent} from "../actual-meditation/actual-meditation.component.js";
import {preparationComponent} from "../preparation/preparation.component.js";
import {meditationSessionEvents} from "./meditation-session.events.js";
import {meditationSessionSelectors} from "./meditation-session.selectors.js";

export const meditationSessionComponent = {
    chainedEvents: meditationSessionChainedEvents,
    children: {
        preparation: preparationComponent,
        actualMeditation: actualMeditationComponent
    },
    events: meditationSessionEvents,
    selectors: meditationSessionSelectors
};