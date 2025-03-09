import {NAVIGATION_INITIAL_STATE} from "./navigation.state.js";
import {navigationEventHandlers} from "./navigation.reducers.js";

export const navigationComponent = {
    initialState: NAVIGATION_INITIAL_STATE,
    eventHandlers: navigationEventHandlers,
}