import {getFormattedTime, isTimerRunning} from "../timer/timer.selectors.js";


export const getMeditationTimerState = (state) => state.meditationTimer;
export const getPreparationTimerState = (state) => state.preparationTimer;

export const getDisplayedTime = (state) => getFormattedTime(getMeditationTimerState(state));
export const canMeditationSessionBeStarted = (state) => true;
export const canDurationBeChanged = (state) => true;
export const canGongVolumeBeChanged = (state) => true;
export const isMediationTimerRunning = (state) => isTimerRunning(getMeditationTimerState(state));
export const isPreparationTimerRunning = (state) =>isTimerRunning(getPreparationTimerState(state));