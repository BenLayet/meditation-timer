import {
    meditationSessionCompleted,
    meditationSessionResetRequested,
    meditationSessionStartRequested
} from "./components/meditation-session/meditation-session.events.js";
import {
    preparationCompleted,
    preparationStartRequested,
    preparationStopRequested
} from "./components/preparation/preparation.events.js";
import {
    actualMeditationCompleted,
    actualMeditationResetRequested,
    actualMeditationSaveSucceeded,
    actualMeditationStartRequested
} from "./components/actual-meditation/actual-meditation.events.js";
import {settingsComponent} from "./components/settings/settings.component.js";
import {meditationSessionComponent} from "./components/meditation-session/meditation-session.component.js";
import {preparationComponent} from "./components/preparation/preparation.component.js";
import {actualMeditationComponent} from "./components/actual-meditation/actual-meditation.component.js";
import {createSelectors} from "./lib/component-selector.js";
import {ACTUAL_MEDITATION_INITIAL_STATE} from "./components/actual-meditation/actual-meditation.reducers.js";
import {PREPARATION_INITIAL_STATE} from "./components/preparation/preparation.reducers.js";
import {SETTINGS_INITIAL_STATE} from "./components/settings/settings.reducers.js";
import {STATISTICS_INITIAL_STATE} from "./components/statistics/statistics.reducers.js";
import {statisticsComponent} from "./components/statistics/statistics.component.js";
import {statisticsFetchRequested} from "./components/statistics/statistics.events.js";
import {and, not, or} from "./lib/predicate.functions.js";

//TODO tree of componeil ilnts and tree of states ?
export const meditationTimerApp = {
    initialState: {
        actualMeditation: ACTUAL_MEDITATION_INITIAL_STATE,
        preparation: PREPARATION_INITIAL_STATE,
        settings: SETTINGS_INITIAL_STATE,
        statistics: STATISTICS_INITIAL_STATE,
    },
    components: {
        settings: settingsComponent,
        meditationSession: meditationSessionComponent,
        preparation: preparationComponent,
        actualMeditation: actualMeditationComponent,
        statistics: statisticsComponent,
    },
    eventForwarders: [
        {
            onEvent: meditationSessionStartRequested,
            thenDispatch: preparationStartRequested
        },
        {
            onEvent: meditationSessionResetRequested,
            thenDispatch: preparationStopRequested
        },
        {
            onEvent: meditationSessionResetRequested,
            thenDispatch: actualMeditationResetRequested
        },
        {
            onEvent: preparationCompleted,
            thenDispatch: actualMeditationStartRequested
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
const inspiringImageShouldBeDisplayed = not(or(statisticsShouldBeDisplayed, componentSelectors.preparation.isRunning))
const canSettingsBeOpened = or(canMeditationSessionBeStarted, statisticsShouldBeDisplayed);

export const appSelectors = {
    ...componentSelectors,
    canMeditationSessionBeStarted,
    canMeditationSessionBeReset,
    canDurationBeChanged,
    canSettingsBeOpened,
    actualMeditationTimerIsVisible,
    statisticsShouldBeDisplayed,
    inspiringImageShouldBeDisplayed
};