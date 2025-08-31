import ow from "ow";

export const statisticsEvents = {
  statisticsRequested: {
    eventType: "statisticsRequested",
    handler: (state) => ({
      ...state,
      error: false,
      currentEpochDay: null,
      isMeditationHistoryLoading: true,
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
  retrievePersistedMeditationHistoryRequested: {
    eventType: "retrievePersistedMeditationHistoryRequested",
  },
  retrievePersistedMeditationHistorySucceeded: {
    eventType: "retrievePersistedMeditationHistorySucceeded",
    payloadShape: {
      meditationHistory: ow.array.ofType(
        ow.object.partialShape({
          startedTimeInSeconds: ow.number.positive,
          durationInMinutes: ow.number.greaterThanOrEqual(0),
        }),
      ),
    },
    handler: (state, { meditationHistory }) => ({
      ...state,
      isMeditationHistoryLoading: false,
      meditationHistory,
    }),
  },
  clearMeditationHistoryRequested: {
    eventType: "clearMeditationHistoryRequested",
    handler: (state) => ({
      ...state,
      isMeditationHistoryLoading: true,
    }),
  },
  clearMeditationHistorySucceeded: {
    eventType: "clearMeditationHistorySucceeded",
    handler: (state) => ({
      ...state,
      meditationHistory: [],
      isMeditationHistoryLoading: false,
    }),
  },
};
