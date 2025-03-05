import {
    actualMeditationCancelRequested,
    actualMeditationCompleted,
    actualMeditationSaveRequested,
    actualMeditationStopped
} from "./actual-meditation.events.js";

export const actualMeditationChainedEvents = [
    {
        onEvent: actualMeditationCompleted,
        thenDispatch: actualMeditationStopped
    },
    {
        onEvent: actualMeditationCancelRequested,
        thenDispatch: actualMeditationStopped
    },
    {
        onEvent: actualMeditationCompleted,
        thenDispatch: actualMeditationSaveRequested
    },
];
