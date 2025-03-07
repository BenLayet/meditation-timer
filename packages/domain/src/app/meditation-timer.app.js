import {
    meditationSessionCompleted,
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../features/meditation-session/meditation-session.events.js";
import {
    actualMeditationSaveSucceeded,
    actualMeditationStartRequested
} from "../features/actual-meditation/actual-meditation.events.js";
import {meditationSessionFeature} from "../features/meditation-session/meditation-session.feature.js";
import {createSelectors} from "../lib/feature-selector.js";
import {statisticsFeature} from "../features/statistics/statistics.feature.js";
import {statisticsFetchRequested} from "../features/statistics/statistics.events.js";
import {and, not, or} from "../lib/predicate.functions.js";
import {meditationSettingsFeature} from "../features/meditation-settings/meditation-settings.feature.js";
import {navigationRequested} from "../features/navigation/navigation.events.js";
import {navigationFeature} from "../features/navigation/navigation.feature.js";
import {preparationCompleted, preparationStartRequested} from "../features/preparation/preparation.events.js";
import {flow} from "lodash-es";
import {navigationSelectors} from "../features/navigation/navigation.selectors.js";

const subFeatures = {
    navigation: navigationFeature,
    meditationSettings: meditationSettingsFeature,
    meditationSession: meditationSessionFeature,
    statistics: statisticsFeature,
};

const meditationSettingsState = state => state.meditationSettings;
const meditationSessionState = state => state.meditationSession;
const statisticsState = state => state.statistics;
const navigationState = state => state.navigation;
const currentPage = flow(navigationState, navigationSelectors.currentPage)
const canSettingsBeOpened = flow(navigationState, navigationSelectors.currentPage, ['STATISTICS', 'HOME'].includes)
export const appSelectors = {
    navigationState,
    meditationSettingsState,
    meditationSessionState,
    statisticsState,
    canSettingsBeOpened,
    currentPage
};

export const meditationTimerApp = {
    subFeatures,
    chainedEvents: [
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
    ],
    selectors: appSelectors,
};