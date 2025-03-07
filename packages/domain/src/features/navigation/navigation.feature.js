import {NAVIGATION_INITIAL_STATE, navigationEventHandlers} from "./navigation.state.js";
import {navigationSelectors} from "./navigation.selectors.js";

export const navigationFeature = {
    initialState: NAVIGATION_INITIAL_STATE,
    eventHandlers: navigationEventHandlers,
}