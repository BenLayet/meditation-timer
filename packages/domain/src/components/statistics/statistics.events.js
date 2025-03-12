import ow from "ow";

export const statisticsEvents = {
    fetchRequested: {
        eventType: "fetchRequested",
        handler: (state) => ({
            ...state,
            loading: true,
            error: false,
        })
    },
    fetchSucceeded: {
        eventType: "fetchSucceeded",
        payloadShape: {
            statistics: ow.object.exactShape({
                dailyStreak: ow.number.integer.greaterThanOrEqual(0),
                totalMinutesThisWeek: ow.number.integer.greaterThanOrEqual(0),
            })
        },
        handler: (state, {statistics}) => ({
            ...state,
            loading: false,
            error: false,
            ...statistics
        })
    },
    fetchFailed: {
        eventType: "fetchFailed",
        payloadShape: {
            error: ow.string
        },
        handler: (state) => ({
            ...state,
            loading: false,
            error: true,
        })
    }
};
