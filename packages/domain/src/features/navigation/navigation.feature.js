import {navigationEventHandlers} from "./navigation.state.js";
import {navigationSelectors} from "./navigation.selectors.js";

export const navigationFeature = {
    eventHandlers: navigationEventHandlers,
    selectors: navigationSelectors
}