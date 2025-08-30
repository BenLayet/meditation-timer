import ow from "ow";

export const meditationSessionEvents = {
  startRequested: {
    eventType: "startRequested",
    payloadShape: {
      currentTimeInSeconds: ow.number.integer.positive,
    },
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
