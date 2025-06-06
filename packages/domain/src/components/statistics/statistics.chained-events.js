import { statisticsEvents } from "./statistics.events.js";
import { calculateStatistics } from "./statistics.functions.js";

export const statisticsChainedEvents = [
  {
    onEvent: statisticsEvents.statisticsRequested,
    thenDispatch: statisticsEvents.meditationHistoryRequested,
  },
  {
    onEvent: statisticsEvents.meditationHistoryRetrieved,
    thenDispatch: statisticsEvents.statisticsRetrieved,
    withPayload: ({ previousPayload }) => ({
      statistics: calculateStatistics(
        previousPayload.meditations,
        previousPayload.currentEpochDay,
      ),
    }),
  },
];
