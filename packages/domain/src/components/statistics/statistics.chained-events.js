import {statisticsEvents} from "./statistics.events.js";
import { calculateStatistics } from "./statistics.functions.js";

export const statisticsChainedEvents = [
    {
        onEvent: statisticsEvents.statisticsRequested,
        thenDispatch: statisticsEvents.currentDayRequested
    },
    {
        onEvent: statisticsEvents.currentDayObtained,
        thenDispatch: statisticsEvents.meditationHistoryRequested,
        withPayload: ({previousPayload}) => ({...previousPayload}),
    },
    {
        onEvent: statisticsEvents.meditationHistoryRetrieved,
        thenDispatch: statisticsEvents.statisticsRetrieved,
        withPayload: ({previousPayload}) => ({
            statistics: calculateStatistics(previousPayload.meditationHistory, previousPayload.currentEpochDay)
        })
    },
];
