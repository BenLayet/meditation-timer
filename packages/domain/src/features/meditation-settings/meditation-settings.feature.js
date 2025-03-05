import {meditationSettingsSelectors} from "./meditation-settings.selectors.js";
import {meditationSettingsEventHandlers} from "./meditation-settings.reducers.js";

export const meditationSettingsFeature = {
    eventHandlers: meditationSettingsEventHandlers,
    selectors: meditationSettingsSelectors
};