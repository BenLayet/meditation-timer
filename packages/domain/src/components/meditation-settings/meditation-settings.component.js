import {MEDITATION_SETTINGS_INITIAL_STATE} from "./meditation-settings.state.js";
import {meditationSettingsSelectors} from "./meditation-settings.selectors.js";
import {meditationSettingsEvents} from "./meditation-settings.events.js";

export const meditationSettingsComponent = {
    initialState: MEDITATION_SETTINGS_INITIAL_STATE,
    selectors: meditationSettingsSelectors,
    events: meditationSettingsEvents,
};