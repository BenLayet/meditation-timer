import {
    meditationSessionCompleted,
    meditationSessionFinished,
    meditationSessionStopRequested
} from "./meditation-session.events.js";
import {preparationFinished} from "../preparation/preparation.events.js";
import {
    actualMeditationCancelRequested,
    actualMeditationCompleted
} from "../actual-meditation/actual-meditation.events.js";

export const meditationSessionChainedEvents = [
    {
        onEvent: meditationSessionCompleted,
        thenDispatch: meditationSessionFinished
    },
    {
        onEvent: meditationSessionStopRequested,
        thenDispatch: meditationSessionFinished
    },
    {
        onEvent: meditationSessionStopRequested,
        thenDispatch: preparationFinished,
    },
    {
        onEvent: meditationSessionStopRequested,
        thenDispatch: actualMeditationCancelRequested
    },
    {
        onEvent: actualMeditationCompleted,
        thenDispatch: meditationSessionCompleted
    },
];
