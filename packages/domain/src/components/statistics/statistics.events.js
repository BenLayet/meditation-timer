import ow from "ow";

export const statisticsEvents = {
  statisticsRequested: {
    eventType: "statisticsRequested",
    handler: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
  },
  statisticsRetrieved: {
    eventType: "statisticsRetrieved",
    payloadShape: {
      statistics: ow.object.exactShape({
        dailyStreak: ow.number.integer.greaterThanOrEqual(0),
        totalMinutesThisWeek: ow.number.integer.greaterThanOrEqual(0),
      }),
    },
    handler: (state, { statistics }) => ({
      ...state,
      loading: false,
      error: false,
      ...statistics,
    }),
  },
  currentDayRequested: {
    eventType: "currentDayRequested",
  },
  currentDayObtained: {
    eventType: "currentDayObtained",
    payloadShape: {
      currentEpochDay: ow.number.integer.greaterThanOrEqual(0),
    },
    handler: (state, { currentEpochDay }) => ({
      ...state,
      currentEpochDay,
    }),
  },
  meditationHistoryRequested: {
    eventType: "meditationHistoryRequested",
  },
  meditationHistoryRetrieved: {
    eventType: "meditationHistoryRetrieved",
    payloadShape: {
      currentEpochDay: ow.number.positive,
      meditationHistory: ow.array.ofType(
        ow.object.partialShape({
          startedTimeInSeconds: ow.number.positive,
          durationInMinutes: ow.number.greaterThanOrEqual(0),
        }),
      ),
    },
    handler: (state, { meditationHistory }) => ({
      ...state,
      meditationHistory,
    }),
  },
  meditationHistoryFailed: {
    eventType: "meditationHistoryFailed",
    payloadShape: {
      error: ow.any,
    },
    handler: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
};
