import {floor} from "lodash-es";

const hourCount = (minutes) => ({count: floor(minutes / 60)});
const minuteCount = (minutes) => ({count: minutes % 60});

const isLoading = state => state.loading;
const hasError = state => state.error;
const dailyStreak = state => state.dailyStreak;
const hourCountThisWeek = state => hourCount(state.totalMinutesThisWeek);
const minuteCountThisWeek = state => minuteCount(state.totalMinutesThisWeek);
const shouldDailyStreakBeDisplayed = state => state.dailyStreak > 1;
const shouldTotalMinutesThisWeekBeDisplayed = state => state.totalMinutesThisWeek > 0;
const shouldBeDisplayed = state => shouldDailyStreakBeDisplayed(state) || shouldTotalMinutesThisWeekBeDisplayed(state);

export const statisticsSelectors = {
    isLoading,
    hasError,
    dailyStreak,
    hourCountThisWeek,
    minuteCountThisWeek,
    shouldBeDisplayed,
    shouldTotalMinutesThisWeekBeDisplayed,
    shouldDailyStreakBeDisplayed
};