import {
    meditationSessionCompleted,
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../features/meditation-session/meditation-session.events.js";
import {
    preparationCompleted,
    preparationFinished,
    preparationStartRequested,
} from "../features/preparation/preparation.events.js";
import {
    actualMeditationCancelRequested,
    actualMeditationCompleted,
    actualMeditationSaveSucceeded,
    actualMeditationStartRequested
} from "../features/actual-meditation/actual-meditation.events.js";
import {meditationSessionFeature} from "../features/meditation-session/meditation-session.feature.js";
import {preparationFeature} from "../features/preparation/preparation.feature.js";
import {actualMeditationFeature} from "../features/actual-meditation/actual-meditation.feature.js";
import {createSelectors} from "../lib/feature-selector.js";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "../features/actual-meditation/actual-meditation.state.js";
import {PREPARATION_INITIAL_STATE} from "../features/preparation/preparation.state.js";
import {STATISTICS_INITIAL_STATE} from "../features/statistics/statistics.state.js";
import {statisticsFeature} from "../features/statistics/statistics.feature.js";
import {statisticsFetchRequested} from "../features/statistics/statistics.events.js";
import {and, not, or} from "../lib/predicate.functions.js";
import {meditationSettingsFeature} from "../features/meditation-settings/meditation-settings.feature.js";
import {MEDITATION_SETTINGS_INITIAL_STATE} from "../features/meditation-settings/meditation-settings.state.js";
import {navigationRequested} from "../features/navigation/navigation.events.js";
import {NAVIGATION_INITIAL_STATE} from "../features/navigation/navigation.state.js";
import {navigationFeature} from "../features/navigation/navigation.feature.js";

//TODO tree of features and tree of states ?
export const meditationTimerApp = {
    initialState: {
        navigation: NAVIGATION_INITIAL_STATE,
        meditationSettings: MEDITATION_SETTINGS_INITIAL_STATE,
        preparation: PREPARATION_INITIAL_STATE,
        actualMeditation: ACTUAL_MEDITATION_INITIAL_STATE,
        statistics: STATISTICS_INITIAL_STATE,
    },
    features: {
        navigation: navigationFeature,
        meditationSettings: meditationSettingsFeature,
        meditationSession: meditationSessionFeature,
        preparation: preparationFeature,
        actualMeditation: actualMeditationFeature,
        statistics: statisticsFeature,
    },
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
            onEvent: meditationSessionStopRequested,
            thenDispatch: preparationFinished,
        },
        {
            onEvent: meditationSessionStopRequested,
            thenDispatch: actualMeditationCancelRequested
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
            onEvent: actualMeditationCompleted,
            thenDispatch: meditationSessionCompleted
        },
        {
            onEvent: actualMeditationSaveSucceeded,
            thenDispatch: statisticsFetchRequested
        },
    ]
};
//TODO chain selectors like in reselect
const featureSelectors = createSelectors(meditationTimerApp.features);
const canMeditationSessionBeStarted = and(not(featureSelectors.actualMeditation.hasStarted), not(featureSelectors.preparation.isRunning));
const canMeditationSessionBeReset = not(canMeditationSessionBeStarted);
const canDurationBeChanged = canMeditationSessionBeStarted;
const actualMeditationTimerIsVisible = or(canDurationBeChanged, featureSelectors.actualMeditation.isRunning);
const statisticsShouldBeDisplayed = and(featureSelectors.actualMeditation.hasCompleted, featureSelectors.statistics.shouldBeDisplayed);
const inspiringImageShouldBeDisplayed = not(canDurationBeChanged)
const canSettingsBeOpened = or(canMeditationSessionBeStarted, statisticsShouldBeDisplayed);
const currentPage = featureSelectors.navigation.currentPage;
const nextPreparationDuration = featureSelectors.meditationSettings.preparationDuration;
const nextMeditationDuration = featureSelectors.meditationSettings.meditationDuration;
export const appSelectors = {
    ...featureSelectors,
    canMeditationSessionBeStarted,
    canMeditationSessionBeReset,
    canDurationBeChanged,
    canSettingsBeOpened,
    actualMeditationTimerIsVisible,
    statisticsShouldBeDisplayed,
    inspiringImageShouldBeDisplayed,
    currentPage,
    nextPreparationDuration,
    nextMeditationDuration
};