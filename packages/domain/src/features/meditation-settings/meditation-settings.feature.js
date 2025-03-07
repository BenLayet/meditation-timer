import {MEDITATION_SETTINGS_INITIAL_STATE} from "./meditation-settings.state.js";
import {meditationSettingsEventHandlers} from "./meditation-settings.reducers.js";

export const meditationSettingsFeature = {
    initialState: MEDITATION_SETTINGS_INITIAL_STATE,
    eventHandlers: meditationSettingsEventHandlers
};