import { floor, max } from "lodash-es";
import { z } from "zod";

// zod schemas for payloads
const setMeditationDurationPayload = z.object({
  meditationDurationInMinutes: z.number().int().positive(),
});
const startSessionRequestedPayload = z.object({
  currentTimeInSeconds: z.number().int().positive(),
});

//events
export const newMeditationEvents = {
  moreMeditationTimeRequested: {
    eventType: "moreMeditationTimeRequested",
    isNewCycle: true,
  },
  lessMeditationTimeRequested: {
    eventType: "lessMeditationTimeRequested",
    isNewCycle: true,
  },
  setMeditationDurationRequested: {
    eventType: "setMeditationDurationRequested",
    payloadShape: setMeditationDurationPayload,
    handler: (state, payload) => ({
      ...state,
      meditationDurationInMinutes: payload.meditationDurationInMinutes,
    }),
  },
  startSessionRequested: {
    eventType: "startSessionRequested",
    payloadShape: startSessionRequestedPayload,
    isNewCycle: true,
  },
};
