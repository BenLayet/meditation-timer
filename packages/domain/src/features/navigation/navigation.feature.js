import {navigationEventHandlers} from "./navigation.reducers.js";
import {navigationSelectors} from "./navigation.selectors.js";

export const navigationFeature = {
    eventHandlers: navigationEventHandlers,
    selectors: navigationSelectors
}