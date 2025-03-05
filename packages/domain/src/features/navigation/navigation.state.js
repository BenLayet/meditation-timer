import {navigationRequested} from "./navigation.events.js";

export const NAVIGATION_INITIAL_STATE = {
    currentPage: 'HOME'
};

const onNavigationRequested = ({page}) => ({currentPage: page});

export const navigationEventHandlers = {
    [navigationRequested.eventType]: onNavigationRequested,
};
