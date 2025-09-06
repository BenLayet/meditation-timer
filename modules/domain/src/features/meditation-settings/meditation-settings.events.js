import { floor, max } from "lodash-es";
import { z } from "zod";

//UTILITY
function calculateIncrementedDuration(duration, increment) {
  return floor((duration + increment) / increment) * increment;
}

function calculateDecrementedDuration(duration, increment) {
  const diff = duration - increment;
  if (diff < increment) {
    return max([duration - 1, 1]);
  }
  return diff;
}

const settingsPayload = z.object({
  meditationDurationInMinutes: z.number().int().positive(),
  preparationDurationInSeconds: z.number().int().positive(),
  gongOff: z.boolean(),
});

//events
export const meditationSettingsEvents = {
  moreMeditationTimeRequested: {
    eventType: "moreMeditationTimeRequested",
    handler: (state) => ({
      ...state,
      meditationDurationInMinutes: calculateIncrementedDuration(
        state.meditationDurationInMinutes,
        state.meditationIncrementInMinutes,
      ),
    }),
    isNewCycle: true,
  },
  lessMeditationTimeRequested: {
    eventType: "lessMeditationTimeRequested",
    handler: (state) => ({
      ...state,
      meditationDurationInMinutes: calculateDecrementedDuration(
        state.meditationDurationInMinutes,
        state.meditationIncrementInMinutes,
      ),
    }),
    isNewCycle: true,
  },
  morePreparationTimeRequested: {
    eventType: "morePreparationTimeRequested",
    handler: (state) => ({
      ...state,
      preparationDurationInSeconds: calculateIncrementedDuration(
        state.preparationDurationInSeconds,
        state.preparationIncrementInSeconds,
      ),
    }),
    isNewCycle: true,
  },
  lessPreparationTimeRequested: {
    eventType: "lessPreparationTimeRequested",
    handler: (state) => ({
      ...state,
      preparationDurationInSeconds: calculateDecrementedDuration(
        state.preparationDurationInSeconds,
        state.preparationIncrementInSeconds,
      ),
    }),
    isNewCycle: true,
  },
  gongToggled: {
    eventType: "gongToggled",
    handler: (state) => ({
      ...state,
      gongOff: !state.gongOff,
    }),
    isNewCycle: true,
  },
  gongOffToggled: {
    eventType: "gongOffToggled",
  },
  gongOnToggled: {
    eventType: "gongOnToggled",
  },
  gongPlayRequested: {
    eventType: "gongPlayRequested",
    isNewCycle: true,
  },
  gongStopRequested: {
    eventType: "gongStopRequested",
    isNewCycle: true,
  },
  settingsChanged: {
    eventType: "settingsChanged",
    payloadShape: settingsPayload,
  },
  settingsLoaded: {
    eventType: "settingsLoaded",
    payloadShape: settingsPayload,
    handler: (state, payload) => ({
      ...state,
      ...payload,
    }),
  },
};
