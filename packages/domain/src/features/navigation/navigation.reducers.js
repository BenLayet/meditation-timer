import {navigationRequested} from "./navigation.events.js";

const onNavigationRequested = (state, {page}) => ({...state, currentPage: page});

export const navigationEventHandlers = {
    [navigationRequested.eventType]: onNavigationRequested,
};
