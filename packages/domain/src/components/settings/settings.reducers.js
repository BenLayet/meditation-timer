import {gongToggled} from "./settings.events.js";

export const SETTINGS_INITIAL_STATE = {
    gongOff: false,
    language: "en",
};

const onGongToggled = (payload, state) => ({...state, gongOff: !state.gongOff});

const handlers = {
    [gongToggled.eventType]: onGongToggled,
};
const keepState = (event, state) => state;
export const settingsReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);
