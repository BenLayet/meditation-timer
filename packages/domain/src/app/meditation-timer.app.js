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
import {preparationFeature} from "../features/preparation/preparation.feature.js";
import {actualMeditationFeature} from "../features/actual-meditation/actual-meditation.feature.js";
import {createSelectors} from "../lib/feature-selector.js";
import {statisticsFeature} from "../features/statistics/statistics.feature.js";
import {statisticsFetchRequested} from "../features/statistics/statistics.events.js";
import {and, not, or} from "../lib/predicate.functions.js";
import {meditationSettingsFeature} from "../features/meditation-settings/meditation-settings.feature.js";
import {navigationRequested} from "../features/navigation/navigation.events.js";
import {navigationFeature} from "../features/navigation/navigation.feature.js";
import {preparationCompleted, preparationStartRequested} from "../features/preparation/preparation.events.js";

const features = {
    navigation: navigationFeature,
    meditationSettings: meditationSettingsFeature,
    meditationSession: meditationSessionFeature,
    preparation: preparationFeature,
    actualMeditation: actualMeditationFeature,
    statistics: statisticsFeature,
};
//TODO chain selectors like in reselect
const featureSelectors = createSelectors(features);
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

export const meditationTimerApp = {
    features,
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