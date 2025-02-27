import {gongVolumeSet} from "./settings.events.js";

export const SETTINGS_INITIAL_STATE = {
    gongVolume: 100,
    language: "en",
};

const onGongVolumeSet = ({gongVolume}, settingsState) => ({...settingsState, gongVolume});
export const settingsReducers = (event, state) => {
    switch (event.eventType) {
        case gongVolumeSet.eventType:
            return onGongVolumeSet(event, state);
        default:
            return state;
    }
}