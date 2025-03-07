import {NAVIGATION_INITIAL_STATE} from "./navigation.state.js";
import {navigationEventHandlers} from "./navigation.reducers.js";

export const navigationFeature = {
    initialState: NAVIGATION_INITIAL_STATE,
    eventHandlers: navigationEventHandlers,
}