import {meditationTimerAppEvents} from "./meditation-timer-app.events.js";

//event handlers
export const meditationTimerAppEventHandlers = new Map();
meditationTimerAppEventHandlers.set(
    meditationTimerAppEvents.navigationRequested,
    (state, {page}) => ({...state, currentPage: page})
);