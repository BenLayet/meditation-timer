import { z } from "zod";
import { Events } from "@softersoftware/feature";
import { PreparationState } from "./preparation.state";

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
const durationInSeconds = (state: PreparationState) =>
  state.durationInSeconds ?? 0;
const startedTimeInSeconds = (state: PreparationState) =>
  state.startedTimeInSeconds ?? 0;
const elapsedSeconds =
  (currentTimeInSeconds: number) => (state: PreparationState) => {
    return state.startedTimeInSeconds &&
      currentTimeInSeconds > state.startedTimeInSeconds
      ? currentTimeInSeconds - state.startedTimeInSeconds
      : 0;
  };
const remainingSeconds =
  (currentTimeInSeconds: number) => (state: PreparationState) => {
    return Math.max(
      0,
      durationInSeconds(state) - elapsedSeconds(currentTimeInSeconds)(state),
    );
  };

export const preparationEvents: Events<PreparationState> = {
  startRequested: {
    sanitizePayload: startRequestedPayload.parse,
    handler:
      (payload: {
        requestedDurationInSeconds: number;
        currentTimeInSeconds: number;
      }) =>
      (state) => ({
        ...state,
        durationInSeconds: payload.requestedDurationInSeconds,
        remainingSeconds: payload.requestedDurationInSeconds,
        startedTimeInSeconds: payload.currentTimeInSeconds,
      }),
  },
};
