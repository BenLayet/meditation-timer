import {actualMeditationEvents} from "./actual-meditation.events.js";
import {actualMeditationSelectors} from "./actual-meditation.selectors.js";

export const actualMeditationChainedEvents = [
    {
        onEvent: actualMeditationEvents.completed,
        thenDispatch: actualMeditationEvents.timerStopRequested
    },
    {
        onEvent: actualMeditationEvents.stopRequested,
        thenDispatch: actualMeditationEvents.timerStopRequested
    },
    {
        onEvent: actualMeditationEvents.startRequested,
        thenDispatch: actualMeditationEvents.timerStartRequested
    },
    {
        onEvent: actualMeditationEvents.completed,
        thenDispatch: actualMeditationEvents.saveRequested,
        withPayload: ({state}) => actualMeditationSelectors.meditationToSave(state)
    },
    {
        onEvent: actualMeditationEvents.timerTicked,
        onCondition: ({state}) => actualMeditationSelectors.isTimeUp(state),
        thenDispatch: actualMeditationEvents.completed,
    },
];
