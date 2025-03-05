import {navigationEventHandlers} from "./navigation.reducers.js";
import {navigationSelectors} from "./navigation.selectors.js";

export const navigationComponent = {
    eventHandlers: navigationEventHandlers,
    selectors: navigationSelectors
}