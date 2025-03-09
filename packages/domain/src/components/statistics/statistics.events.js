import ow from "ow";

export const statisticsEvents = {
    fetchRequested: {},
    fetchSucceeded: {
        statistics: ow.object.exactShape({
            dailyStreak: ow.number.integer.greaterThanOrEqual(0),
            totalMinutesThisWeek: ow.number.integer.greaterThanOrEqual(0),
        })
    },
    fetchFailed: {
        error: ow.string
    }
};