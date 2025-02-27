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

//TODO tree of componeil ilnts and tree of states ?
export const meditationTimerApp = {
    initialState: {
        actualMeditation: ACTUAL_MEDITATION_INITIAL_STATE,
        preparation: PREPARATION_INITIAL_STATE,
        settings: SETTINGS_INITIAL_STATE,
    },
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
    ]
};
//TODO chain selectors like in reselect
const componentSelectors = createSelectors(meditationTimerApp.components);
const canMeditationSessionBeStarted = (state) => !componentSelectors.actualMeditation.hasStarted(state) && !componentSelectors.preparation.isRunning(state);
const canMeditationSessionBeReset = (state) => !canMeditationSessionBeStarted(state);
const canDurationBeChanged = canMeditationSessionBeStarted;
const canSettingsBeOpened = canMeditationSessionBeStarted;
export const appSelectors = {
    ...componentSelectors,
    canMeditationSessionBeStarted,
    canMeditationSessionBeReset,
    canDurationBeChanged,
    canSettingsBeOpened,
};