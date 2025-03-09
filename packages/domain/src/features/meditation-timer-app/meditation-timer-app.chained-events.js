import {meditationSessionEvents} from "../meditation-session/meditation-session.events.js";
import {actualMeditationEvents} from "../actual-meditation/actual-meditation.events.js";
import {statisticsEvents} from "../statistics/statistics.events.js";
import {navigationEvents} from "../navigation/navigation.events.js";
import {preparationEvents} from "../preparation/preparation.events.js";

export const meditationTimerAppChainedEvents = [
    {
        onEvent: meditationSessionEvents.startRequested,
        thenDispatch: navigationEvents.navigationRequested,
        withPayload: () => ({page: 'MEDITATION_SESSION'}),
    },
    {
        onEvent: meditationSessionEvents.stopRequested,
        thenDispatch: navigationEvents.navigationRequested,
        withPayload: () => ({page: 'HOME'}),
    },
    {
        onEvent: meditationSessionEvents.completed,
        thenDispatch: navigationEvents.navigationRequested,
        withPayload: () => ({page: 'STATISTICS'}),
    },
    {
        onEvent: meditationSessionEvents.startRequested,
        thenDispatch: preparationEvents.startRequested,
        withPayload: (previousPayload, state) => ({
            currentTimeInSeconds: previousPayload.currentTimeInSeconds,
            requestedDurationInSeconds: state.meditationSettings.preparationDurationInSeconds
        }),
    },
    {
        onEvent: preparationEvents.completed,
        thenDispatch: actualMeditationEvents.startRequested,
        withPayload: (previousPayload, state) => ({
            ...previousPayload,
            durationInMinutes: state.meditationSettings.meditationDurationInMinutes
        }),
    },
    {
        onEvent: actualMeditationEvents.saveSucceeded,
        thenDispatch: statisticsEvents.fetchRequested
    },
];