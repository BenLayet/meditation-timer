import {
    meditationSessionCompleted,
    meditationSessionStartRequested,
    meditationSessionStopRequested
} from "../components/meditation-session/meditation-session.events.js";
import {
    preparationCompleted,
    preparationFinished,
    preparationStartRequested,
} from "../components/preparation/preparation.events.js";
import {
    actualMeditationCancelRequested,
    actualMeditationCompleted,
    actualMeditationSaveSucceeded,
    actualMeditationStartRequested
} from "../components/actual-meditation/actual-meditation.events.js";
import {meditationSessionComponent} from "../components/meditation-session/meditation-session.component.js";
import {preparationComponent} from "../components/preparation/preparation.component.js";
import {actualMeditationComponent} from "../components/actual-meditation/actual-meditation.component.js";
import {createSelectors} from "../lib/component-selector.js";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "../components/actual-meditation/actual-meditation.reducers.js";
import {PREPARATION_INITIAL_STATE} from "../components/preparation/preparation.reducers.js";
import {STATISTICS_INITIAL_STATE} from "../components/statistics/statistics.reducers.js";
import {statisticsComponent} from "../components/statistics/statistics.component.js";
import {statisticsFetchRequested} from "../components/statistics/statistics.events.js";
import {and, not, or} from "../lib/predicate.functions.js";
import {meditationSettingsComponent} from "../components/meditation-settings/meditation-settings.component.js";
import {MEDITATION_SETTINGS_INITIAL_STATE} from "../components/meditation-settings/meditation-settings.reducers.js";
import {navigationRequested} from "../components/navigation/navigation.events.js";
import {NAVIGATION_INITIAL_STATE} from "../components/navigation/navigation.reducers.js";
import {navigationComponent} from "../components/navigation/navigation.component.js";

//TODO tree of components and tree of states ?
export const meditationTimerApp = {
    initialState: {
        navigation: NAVIGATION_INITIAL_STATE,
        meditationSettings: MEDITATION_SETTINGS_INITIAL_STATE,
        preparation: PREPARATION_INITIAL_STATE,
        actualMeditation: ACTUAL_MEDITATION_INITIAL_STATE,
        statistics: STATISTICS_INITIAL_STATE,
    },
    components: {
        navigation: navigationComponent,
        meditationSettings: meditationSettingsComponent,
        meditationSession: meditationSessionComponent,
        preparation: preparationComponent,
        actualMeditation: actualMeditationComponent,
        statistics: statisticsComponent,
    },
    eventForwarders: [
        {
            onEvent: meditationSessionStartRequested,
            thenDispatch: () => navigationRequested('MEDITATION_SESSION'),
        },
        {
            onEvent: meditationSessionStopRequested,
            thenDispatch: () => navigationRequested('HOME'),
        },
        {
            onEvent: meditationSessionCompleted,
            thenDispatch: () => navigationRequested('STATISTICS'),
        },
        {
            onEvent: meditationSessionStartRequested,
            thenDispatch: ({previousPayload, state}) =>
                preparationStartRequested(state.meditationSettings.preparationDurationInSeconds, previousPayload.currentTimeInSeconds)
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
            thenDispatch: ({previousPayload, state}) => actualMeditationStartRequested(
                state.meditationSettings.meditationDurationInMinutes,
                previousPayload.currentTimeInSeconds)
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
const componentSelectors = createSelectors(meditationTimerApp.components);
const canMeditationSessionBeStarted = and(not(componentSelectors.actualMeditation.hasStarted), not(componentSelectors.preparation.isRunning));
const canMeditationSessionBeReset = not(canMeditationSessionBeStarted);
const canDurationBeChanged = canMeditationSessionBeStarted;
const actualMeditationTimerIsVisible = or(canDurationBeChanged, componentSelectors.actualMeditation.isRunning);
const statisticsShouldBeDisplayed = and(componentSelectors.actualMeditation.hasCompleted, componentSelectors.statistics.shouldBeDisplayed);
const inspiringImageShouldBeDisplayed = not(canDurationBeChanged)
const canSettingsBeOpened = or(canMeditationSessionBeStarted, statisticsShouldBeDisplayed);
const currentPage = componentSelectors.navigation.currentPage;
const nextPreparationDuration = componentSelectors.meditationSettings.preparationDuration;
const nextMeditationDuration = componentSelectors.meditationSettings.meditationDuration;
export const appSelectors = {
    ...componentSelectors,
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