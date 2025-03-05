import {
    meditationSessionCompleted,
    meditationSessionFinished, meditationSessionStartRequested,
    meditationSessionStopRequested
} from "./meditation-session.events.js";
import {
    preparationCompleted,
    preparationFinished,
    preparationStartRequested
} from "../preparation/preparation.events.js";
import {
    actualMeditationCancelRequested, actualMeditationCompleted,
    actualMeditationStartRequested
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
