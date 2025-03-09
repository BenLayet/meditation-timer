import {statisticsEvents} from "./statistics.events.js";

//event handlers
export const statisticsEventHandlers = new Map();
statisticsEventHandlers.set(
    statisticsEvents.fetchRequested,
    (state) => ({
        ...state,
        loading: true,
        error: false,
    })
);
statisticsEventHandlers.set(
    statisticsEvents.fetchFailed,
    (state) => ({
        ...state,
        loading: false,
        error: true,
    })
);
statisticsEventHandlers.set(
    statisticsEvents.fetchSucceeded,
    (state, {statistics}) => ({
        ...state,
        loading: false,
        error: false,
        ...statistics
    })
);