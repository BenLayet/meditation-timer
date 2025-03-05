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
const onStatisticsFetchSucceeded = ({statistics}, state) => ({
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