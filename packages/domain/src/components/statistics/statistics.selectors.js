import {floor, flow} from "lodash-es";
import {map} from "../../lib/functions/object.functions.js";

const hourCount = (minutes) => ({count: floor(minutes / 60)});
const minuteCount = (minutes) => ({count: minutes % 60});

const isLoading = state => state.loading;
const hasError = state => state.error;
const dailyStreak = state => state.dailyStreak;
const hourCountThisWeek = state => hourCount(state.totalMinutesThisWeek);
const minuteCountThisWeek = state => minuteCount(state.totalMinutesThisWeek);
const shouldDailyStreakBeDisplayed = state => state.dailyStreak > 1;
const shouldTotalMinutesThisWeekBeDisplayed = state => state.totalMinutesThisWeek > 0;

export const ownStateSelectors = {
    isLoading,
    hasError,
    dailyStreak,
    hourCountThisWeek,
    minuteCountThisWeek,
    shouldTotalMinutesThisWeekBeDisplayed,
    shouldDailyStreakBeDisplayed
};
const ownState = compositeState => compositeState.ownState;
export const statisticsSelectors = map(ownStateSelectors, selector => flow(ownState, selector));
