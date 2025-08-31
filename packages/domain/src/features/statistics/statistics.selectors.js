import { floor, flow } from "lodash-es";
import { map } from "../../lib/functions/object.functions.js";
import { not } from "../../lib/functions/predicate.functions.js";
import { calculateStatistics } from "./statistics.functions.js";

const hourCount = (minutes) => ({ count: floor(minutes / 60) });
const minuteCount = (minutes) => ({ count: minutes % 60 });

const statistics = (state) =>
  calculateStatistics(state.meditationHistory, state.currentEpochDay);
const isLoading = (state) =>
  state.isMeditationHistoryLoading || !state.currentEpochDay;
const hasError = (state) => state.error;
const dailyStreak = flow(statistics, (statistics) => statistics.dailyStreak);
const totalMinutesThisWeek = flow(
  statistics,
  (statistics) => statistics.totalMinutesThisWeek,
);
const hourCountThisWeek = flow(totalMinutesThisWeek, hourCount);
const minuteCountThisWeek = flow(totalMinutesThisWeek, minuteCount);
const shouldDailyStreakBeDisplayed = flow(
  dailyStreak,
  (dailyStreak) => dailyStreak > 1,
);
const shouldTotalMinutesThisWeekBeDisplayed = flow(
  totalMinutesThisWeek,
  (totalMinutesThisWeek) => totalMinutesThisWeek > 0,
);
const meditationCount = (state) => state.meditationHistory?.length || 0;
const isStatisticsPresentationVisible = flow(
  meditationCount,
  (count) => count < 2,
);
export const ownStateSelectors = {
  isLoading,
  hasError,
  dailyStreak,
  hourCountThisWeek,
  minuteCountThisWeek,
  shouldTotalMinutesThisWeekBeDisplayed,
  shouldDailyStreakBeDisplayed,
  meditationCount,
  isStatisticsPresentationVisible,
  statistics,
};
const ownState = (compositeState) => compositeState.ownState;
export const statisticsSelectors = map(ownStateSelectors, (selector) =>
  flow(ownState, selector),
);
