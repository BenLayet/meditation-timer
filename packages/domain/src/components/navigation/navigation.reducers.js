import {navigationRequested} from "./navigation.events.js";

export const NAVIGATION_INITIAL_STATE = {
    currentPage: 'HOME'
};

const onNavigationRequested = ({page}) => ({currentPage: page});

const handlers = {
    [navigationRequested.eventType]: onNavigationRequested,
};
const keepState = (event, state) => state;
export const navigationReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);
