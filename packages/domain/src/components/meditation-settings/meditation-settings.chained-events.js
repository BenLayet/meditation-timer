import {meditationSettingsEvents} from "./meditation-settings.events.js";
import {meditationSettingsSelectors} from "./meditation-settings.selectors.js";

export const meditationSettingsChainedEvents = [
    {
        onEvent: meditationSettingsEvents.gongToggled,
        onCondition: ({state}) => meditationSettingsSelectors.isGongOff(state),
        thenDispatch: meditationSettingsEvents.gongOffToggled,
    },
    {
        onEvent: meditationSettingsEvents.gongToggled,
        onCondition: ({state}) => meditationSettingsSelectors.isGongOn(state),
        thenDispatch: meditationSettingsEvents.gongOnToggled,
    },
 
];
