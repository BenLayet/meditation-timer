import {gongVolumeSet} from "./settings.events.js";

const onGongVolumeSet = ({gongVolume}, settingsState) => ({...settingsState, gongVolume});
export const settingsReducers = (event, state) => {
    switch (event.eventType) {
        case gongVolumeSet.eventType:
            return onGongVolumeSet(event, state);
        default:
            return state;
    }
}