import {MEDITATION_SETTINGS_INITIAL_STATE} from "./meditation-settings.state.js";
import {meditationSettingsEventHandlers} from "./meditation-settings.reducers.js";

export const meditationSettingsComponent = {
    initialState: MEDITATION_SETTINGS_INITIAL_STATE,
    eventHandlers: meditationSettingsEventHandlers
};