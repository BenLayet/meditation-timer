import {statisticsFetchFailed, statisticsFetchRequested, statisticsFetchSucceeded} from "./statistics.events.js";

export const STATISTICS_INITIAL_STATE = {
    loading: false,
    error: false,
};

const onStatisticsFetchRequested = (payload, state) => ({
    ...state,
    loading: true,
    error: false,
});
const onStatisticsFetchFailed = (payload, state) => ({
    ...state,
    loading: false,
    error: true,
});
const onStatisticsFetchSucceeded = ({fetched}, state) => ({
    ...state,
    loading: false,
    error: false,
    ...fetched
});
//TODO export handlers, not reducers + remove word "reducers" from domain package + assert event and assert state before each handler
const handlers = {
    [statisticsFetchRequested.eventType]: onStatisticsFetchRequested,
    [statisticsFetchFailed.eventType]: onStatisticsFetchFailed,
    [statisticsFetchSucceeded.eventType]: onStatisticsFetchSucceeded,

};
const keepState = (event, state) => state;
export const statisticsReducers = (event, state) => (handlers[event.eventType] || keepState)(event.payload, state);