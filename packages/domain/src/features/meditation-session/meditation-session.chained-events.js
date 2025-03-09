import {meditationSessionEvents} from "./meditation-session.events.js";
import {preparationEvents} from "../preparation/preparation.events.js";
import {actualMeditationEvents} from "../actual-meditation/actual-meditation.events.js";

export const meditationSessionChainedEvents = [
    {
        onEvent: meditationSessionEvents.completed,
        thenDispatch: meditationSessionEvents.finished
    },
    {
        onEvent: meditationSessionEvents.stopRequested,
        thenDispatch: meditationSessionEvents.finished
    },
    {
        onEvent: meditationSessionEvents.stopRequested,
        thenDispatch: preparationEvents.finished,
    },
    {
        onEvent: meditationSessionEvents.stopRequested,
        thenDispatch: actualMeditationEvents.cancelRequested
    },
    {
        onEvent: actualMeditationEvents.completed,
        thenDispatch: meditationSessionEvents.completed
    },
];
