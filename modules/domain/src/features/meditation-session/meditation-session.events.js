import { z } from "zod";

const startRequestedPayload = z.object({
  currentTimeInSeconds: z.number().int().positive(),
});

export const meditationSessionEvents = {
  startRequested: {
    eventType: "startRequested",
    payloadShape: startRequestedPayload,
    isNewCycle: true,
  },
  stopRequested: {
    eventType: "stopRequested",
    isNewCycle: true,
  },
  completed: {
    eventType: "completed",
  },
  finished: {
    eventType: "finished",
  },
  disableSleepModeRequested: {
    eventType: "disableSleepModeRequested",
  },
  enableSleepModeRequested: {
    eventType: "enableSleepModeRequested",
  },
};
