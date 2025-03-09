import {navigationEvents} from "./navigation.events.js";

//event handlers
export const navigationEventHandlers = new Map();
navigationEventHandlers.set(
    navigationEvents.navigationRequested,
    (state, {page}) => ({...state, currentPage: page})
);