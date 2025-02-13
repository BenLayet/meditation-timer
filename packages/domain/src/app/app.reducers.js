import * as timerReducers from "../timer/timer.reducers.js";
import {isMediationTimerRunning, isPreparationTimerRunning} from "./app.selectors.js";

const INITIAL_STATE = {
    meditationTimer: {
        durationInSeconds: 5 * 60,
        remainingSeconds: 5 * 60,
    },
    preparationTimer: {
        durationInSeconds: 20,
        remainingSeconds: 20,
    },
    settings: {
        gongVolume: 100,
        language: "English",
    },
};

export const onAppOpened = () => INITIAL_STATE;
export const onMeditationDurationSet = (payload, state) => ({
    ...state,
    meditationTimer: {
        ...state.meditationTimer,
        durationInSeconds: payload.durationInMinutes * 60,
        remainingSeconds: payload.durationInMinutes * 60,
    },
});
export const onPreparationStarted = (payload, state) => ({
    ...state,
    phase: 'PREPARATION',
    preparationTimer: timerReducers.onTimerStarted(payload, state.preparationTimer)
});
export const onActualMeditationStarted = (payload, state) => ({
    ...state,
    phase: 'ACTUAL_MEDITATION',
    meditationTimer: timerReducers.onTimerStarted(payload, state.meditationTimer)
});
export const onTimerTicked = (payload, state) => {
    switch (state.phase) {
        case 'PREPARATION':
            return {...state, preparationTimer: timerReducers.onTimerTicked(payload, state.preparationTimer)}
        case 'ACTUAL_MEDITATION':
            return {...state, meditationTimer: timerReducers.onTimerTicked(payload, state.meditationTimer)}
        default:
            return state;
    }
};
export const onLanguageDetectionRequested = (state) => ({
    ...state,
    languageIsLoading: true,
})