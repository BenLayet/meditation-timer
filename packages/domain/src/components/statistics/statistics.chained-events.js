import { statisticsEvents } from "./statistics.events.js";

export const statisticsChainedEvents = [
  {
    onEvent: statisticsEvents.statisticsRequested,
    thenDispatch: statisticsEvents.retrievePersistedMeditationHistoryRequested,
  },
  {
    onEvent: statisticsEvents.statisticsRequested,
    thenDispatch: statisticsEvents.currentDayRequested,
  },
];
