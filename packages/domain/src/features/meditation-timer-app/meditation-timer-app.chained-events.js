import {
    meditationSessionCompleted,
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../meditation-session/meditation-session.events.js";
import {
    actualMeditationSaveSucceeded,
    actualMeditationStartRequested
} from "../actual-meditation/actual-meditation.events.js";
import {statisticsFetchRequested} from "../statistics/statistics.events.js";
import {navigationRequested} from "../navigation/navigation.events.js";
import {preparationCompleted, preparationStartRequested} from "../preparation/preparation.events.js";

export const meditationTimerAppChainedEvents = [
    {
        onEvent: meditationSessionStartRequested,
        thenDispatch: navigationRequested,
        withPayload: () => ({page: 'MEDITATION_SESSION'}),
    },
    {
        onEvent: meditationSessionStopRequested,
        thenDispatch: navigationRequested,
        withPayload: () => ({page: 'HOME'}),
    },
    {
        onEvent: meditationSessionCompleted,
        thenDispatch: navigationRequested,
        withPayload: () => ({page: 'STATISTICS'}),
    },
    {
        onEvent: meditationSessionStartRequested,
        thenDispatch: preparationStartRequested,
        withPayload: (previousPayload, state) => ({
            currentTimeInSeconds: previousPayload.currentTimeInSeconds,
            requestedDurationInSeconds: state.meditationSettings.preparationDurationInSeconds
        }),
    },
    {
        onEvent: preparationCompleted,
        thenDispatch: actualMeditationStartRequested,
        withPayload: (previousPayload, state) => ({
            ...previousPayload,
            durationInMinutes: state.meditationSettings.meditationDurationInMinutes
        }),
    },
    {
        onEvent: actualMeditationSaveSucceeded,
        thenDispatch: statisticsFetchRequested
    },
];