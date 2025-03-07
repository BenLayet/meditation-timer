import {MEDITATION_SETTINGS_INITIAL_STATE, meditationSettingsEventHandlers} from "./meditation-settings.state.js";

export const meditationSettingsFeature = {
    initialState: MEDITATION_SETTINGS_INITIAL_STATE,
    eventHandlers: meditationSettingsEventHandlers
};