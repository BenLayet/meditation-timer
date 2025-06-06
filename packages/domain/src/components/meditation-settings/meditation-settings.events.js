import { floor, max } from "lodash-es";
import ow from "ow";

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
  startSessionRequested: {
    eventType: "startSessionRequested",
    payloadShape: {
      currentTimeInSeconds: ow.number.positive,
    },
    isNewCycle: true,
  },
};
