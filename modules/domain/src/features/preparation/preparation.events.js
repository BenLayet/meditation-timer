import { max } from "lodash-es";
import { z } from "zod";

const startRequestedPayload = z.object({
  requestedDurationInSeconds: z.number().int().positive(),
  currentTimeInSeconds: z.number().int().positive(),
});
const timerTickedPayload = z.object({
  currentTimeInSeconds: z.number().int().positive(),
});
const completedPayload = z.object({
  currentTimeInSeconds: z.number().int().positive(),
});

const elapsedSeconds = (currentTimeInSeconds) => (state) => {
  return state.startedTimeInSeconds
    ? max([currentTimeInSeconds - state.startedTimeInSeconds, 0])
    : 0;
};
const remainingSeconds = (currentTimeInSeconds) => (state) => {
  return max([
    0,
    state.durationInSeconds - elapsedSeconds(currentTimeInSeconds)(state),
  ]);
};

export const preparationEvents = {
  startRequested: {
    eventType: "startRequested",
    payloadShape: startRequestedPayload,
    handler: (state, { currentTimeInSeconds, requestedDurationInSeconds }) => ({
      ...state,
      durationInSeconds: requestedDurationInSeconds,
      remainingSeconds: requestedDurationInSeconds,
      startedTimeInSeconds: currentTimeInSeconds,
    }),
  },
  stopRequested: {
    eventType: "stopRequested",
    handler: (state) => ({
      ...state,
      durationInSeconds: null,
      remainingSeconds: null,
      startedTimeInSeconds: null,
    }),
  },
  timerStartRequested: {
    eventType: "timerStartRequested",
  },
  timerStopRequested: {
    eventType: "timerStopRequested",
  },
  timerTicked: {
    eventType: "timerTicked",
    payloadShape: timerTickedPayload,
    handler: (state, { currentTimeInSeconds }) => ({
      ...state,
      remainingSeconds: remainingSeconds(currentTimeInSeconds)(state),
    }),
    isNewCycle: true,
  },
  moreTimeRequested: {
    eventType: "moreTimeRequested",
    handler: (state) => ({
      ...state,
      durationInSeconds: state.durationInSeconds + state.timeIncrementInSeconds,
      remainingSeconds: state.remainingSeconds + state.timeIncrementInSeconds,
    }),
    isNewCycle: true,
  },
  completed: {
    eventType: "completed",
    payloadShape: completedPayload,
    handler: (state) => ({
      ...state,
      remainingSeconds: 0,
    }),
  },
  skipRequested: {
    eventType: "skipRequested",
    handler: (state) => ({
      ...state,
      durationInSeconds: 0,
      remainingSeconds: 0,
    }),
  },
};
