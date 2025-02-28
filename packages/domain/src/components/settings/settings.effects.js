import {gongToggled} from "./settings.events.js";
import {settingsSelectors} from "./settings.selectors.js";

export const settingsEffects = ({gongService}) => [
    {
        onEvent: gongToggled,
        then: ({state}) => gongService.setVolume(settingsSelectors.isGongOff(state) ? 0 : 1)
    }
];
