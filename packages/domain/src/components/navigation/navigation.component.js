import {navigationReducers} from "./navigation.reducers.js";
import {navigationSelectors} from "./navigation.selectors.js";

export const navigationComponent = {
    reducers: navigationReducers,
    selectors: navigationSelectors
}