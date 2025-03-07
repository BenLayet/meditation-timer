import {navigationRequested} from "./navigation.events.js";

const onNavigationRequested = ({page}) => ({currentPage: page});

export const navigationEventHandlers = {
    [navigationRequested.eventType]: onNavigationRequested,
};
