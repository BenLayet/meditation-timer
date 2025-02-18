import {
    meditationSessionCompleted,
    meditationSessionStartRequested, meditationSessionStopRequested
} from "./components/meditation-session/meditation-session.events.js";
import {
    preparationCompleted,
    preparationStartRequested,
    preparationStopRequested
} from "./components/preparation/preparation.events.js";
import {
    actualMeditationCompleted, actualMeditationResetRequested,
    actualMeditationStartRequested
} from "./components/actual-meditation/actual-meditation.events.js";
import {settingsComponent} from "./components/settings/settings.component.js";
import {meditationSessionComponent} from "./components/meditation-session/meditation-session.component.js";
import {preparationComponent} from "./components/preparation/preparation.component.js";
import {actualMeditationComponent} from "./components/actual-meditation/actual-meditation.component.js";
import {createSelectors} from "./lib/component-selector.js";

const initialState = {
    actualMeditation: {
        durationInMinutes: 5,
    },
    preparation: {
        durationInSeconds: 20,
    },
    settings: {
        gongVolume: 100,
        language: "en",
    },
};
//TODO tree of components and tree of states ?
export const meditationTimerApp = {
    initialState,
    components: {
        settings: settingsComponent,
        meditationSession: meditationSessionComponent,
        preparation: preparationComponent,
        actualMeditation: actualMeditationComponent,
    },
    eventForwarders: [
        {
            onEvent: meditationSessionStartRequested,
            thenDispatch: preparationStartRequested
        },
        {
            onEvent: meditationSessionStopRequested,
            thenDispatch: preparationStopRequested
        },
        {
            onEvent: meditationSessionStopRequested,
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
    ]
};
//TODO chain selectors like in reselect
const componentSelectors = createSelectors(meditationTimerApp.components);
const canMeditationSessionBeStarted = (state) => !componentSelectors.actualMeditation.hasStarted(state) && !componentSelectors.preparation.isRunning(state);
const canMeditationSessionBeStopped = (state) => componentSelectors.actualMeditation.isRunning(state) || componentSelectors.preparation.isRunning(state);
const canMeditationSessionBeReset = (state) => componentSelectors.actualMeditation.hasCompleted(state);
export const appSelectors = {
    ...componentSelectors,
    canMeditationSessionBeStarted,
    canMeditationSessionBeReset,
    canMeditationSessionBeStopped,
};