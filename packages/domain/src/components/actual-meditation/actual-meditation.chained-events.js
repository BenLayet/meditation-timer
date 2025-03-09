import {actualMeditationEvents} from "./actual-meditation.events.js";

export const actualMeditationChainedEvents = [
    {
        onEvent: actualMeditationEvents.completed,
        thenDispatch: actualMeditationEvents.stopped
    },
    {
        onEvent: actualMeditationEvents.cancelRequested,
        thenDispatch: actualMeditationEvents.stopped
    },
    {
        onEvent: actualMeditationEvents.completed,
        thenDispatch: actualMeditationEvents.saveRequested
    },
];
