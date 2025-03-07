import {NAVIGATION_INITIAL_STATE, navigationEventHandlers} from "./navigation.state.js";

export const navigationFeature = {
    initialState: NAVIGATION_INITIAL_STATE,
    eventHandlers: navigationEventHandlers,
}