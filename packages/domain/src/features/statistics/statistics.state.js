import {statisticsFetchFailed, statisticsFetchRequested, statisticsFetchSucceeded} from "./statistics.events.js";

export const STATISTICS_INITIAL_STATE = {
    loading: false,
    error: false,
};

const onStatisticsFetchRequested = (state) => ({
    ...state,
    loading: true,
    error: false,
});
const onStatisticsFetchFailed = (state) => ({
    ...state,
    loading: false,
    error: true,
});
const onStatisticsFetchSucceeded = (state, {statistics}) => ({
    ...state,
    loading: false,
    error: false,
    ...statistics
});
export const statisticsEventHandlers = {
    [statisticsFetchRequested.eventType]: onStatisticsFetchRequested,
    [statisticsFetchFailed.eventType]: onStatisticsFetchFailed,
    [statisticsFetchSucceeded.eventType]: onStatisticsFetchSucceeded,

};