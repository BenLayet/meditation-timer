import {createEventFactory} from "../../lib/event-factory.js";
import ow from "ow";

export const statisticsFetchRequested = createEventFactory('statisticsFetchRequested');
export const statisticsFetchSucceeded = createEventFactory('statisticsFetchSucceeded',
    ({statistics}) => {
        ow(statistics, ow.object.exactShape({
            dailyStreak: ow.number.integer.greaterThanOrEqual(0),
            totalMinutesThisWeek: ow.number.integer.greaterThanOrEqual(0),
        }));
        return {statistics};
    });
export const statisticsFetchFailed = createEventFactory('statisticsFetchFailed');

