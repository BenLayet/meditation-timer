import { z } from "zod";
import { floor, max } from "lodash-es";
import { ACTUAL_MEDITATION_INITIAL_STATE } from "./actual-meditation.state.js";

// utility
const durationInSeconds = (state) => {
  return state.durationInMinutes * 60;
};
const elapsedSeconds = (currentTimeInSeconds) => (state) => {
  return state.startedTimeInSeconds
    ? floor(currentTimeInSeconds - state.startedTimeInSeconds)
    : 0;
};
const remainingSeconds = (currentTimeInSeconds) => (state) => {
  return max([
    0,
    durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state),
  ]);
};

// zod schemas for payloads
const startRequestedPayload = z.object({
  currentTimeInSeconds: z.number().int().positive(),
  durationInMinutes: z.number().int().positive(),
});
const timerTickedPayload = z.object({
  currentTimeInSeconds: z.number().int().positive(),
});
const saveRequestedPayload = z.object({
  startedTimeInSeconds: z.number().positive(),
  durationInMinutes: z.number().min(0),
});
const saveFailedPayload = z.object({
  error: z.unknown(),
});

export const actualMeditationEvents = {
  startRequested: {
    eventType: "startRequested",
    payloadShape: startRequestedPayload,
    handler: (state, { currentTimeInSeconds, durationInMinutes }) => ({
      ...state,
      durationInMinutes,
      startedTimeInSeconds: currentTimeInSeconds,
      remainingSeconds: durationInMinutes * 60,
    }),
    isNewCycle: true,
  },
  stopRequested: {
    eventType: "stopRequested",
    handler: () => ACTUAL_MEDITATION_INITIAL_STATE,
  },
  completed: { eventType: "completed" },
  timerTicked: {
    eventType: "timerTicked",
    payloadShape: timerTickedPayload,
    handler: (state, { currentTimeInSeconds }) => ({
      ...state,
      remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
    }),
    isNewCycle: true,
  },
  timerStartRequested: { eventType: "timerStartRequested" },
  timerStopRequested: { eventType: "timerStopRequested" },
  saveRequested: {
    eventType: "saveRequested",
    payloadShape: saveRequestedPayload,
  },
  saveFailed: {
    eventType: "saveFailed",
    payloadShape: saveFailedPayload,
  },
  saveSucceeded: { eventType: "saveSucceeded" },
};
