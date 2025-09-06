import { z } from "zod";

const statisticsPayload = z.object({
  statistics: z.object({
    dailyStreak: z.number().int().min(0),
    totalMinutesThisWeek: z.number().int().min(0),
  }),
});
const currentDayPayload = z.object({
  currentEpochDay: z.number().int().min(0),
});
const meditationHistoryPayload = z.object({
  meditationHistory: z.array(
    z.object({
      startedTimeInSeconds: z.number().positive().optional(),
      durationInMinutes: z.number().min(0).optional(),
    })
  ),
});

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
    payloadShape: statisticsPayload,
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
    payloadShape: currentDayPayload,
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
    payloadShape: meditationHistoryPayload,
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
