import {meditationSettingsSelectors} from "./meditation-settings.selectors.js";
import {meditationSettingsEventHandlers} from "./meditation-settings.reducers.js";

export const meditationSettingsComponent = {
    eventHandlers: meditationSettingsEventHandlers,
    selectors: meditationSettingsSelectors
};