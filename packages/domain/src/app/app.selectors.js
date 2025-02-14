import {flow} from 'lodash-es';
import {timerSelectors} from "../timer/timer.selectors.js";
import {settingsSelectors} from "../settings/settings.selectors.js";

const getSettingsState = (state) => state.settings;

const getMeditationTimerState = (state) => state.meditationTimer;
const getPreparationTimerState = (state) => state.preparationTimer;
const getGongVolume = flow(getSettingsState, settingsSelectors.getGongVolume);
const getFormattedTimeToDisplay = flow(getMeditationTimerState, timerSelectors.getFormattedTimeToDisplay);
const canMeditationSessionBeStarted = (state) => true;
const canDurationBeChanged = (state) => true;
const canGongVolumeBeChanged = (state) => true;
const isPreparationRunning = flow(getPreparationTimerState, timerSelectors.isTimerRunning);


export const appSelectors = {
    getMeditationTimerState,
    getPreparationTimerState,
    getGongVolume,
    getFormattedTimeToDisplay,
    canMeditationSessionBeStarted,
    canDurationBeChanged,
    canGongVolumeBeChanged,
    isPreparationRunning
};