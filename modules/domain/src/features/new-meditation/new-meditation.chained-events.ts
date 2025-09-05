import { newMeditationEvents } from "./new-meditation.events.js";
import { floor, max } from "lodash-es";
import { validatePositiveInteger } from "@softersoftware/functions/assert.functions.js";
//UTILITY
function calculateIncrementedDuration(duration, increment) {
  validatePositiveInteger({ duration });
  validatePositiveInteger({ increment });
  return floor((duration + increment) / increment) * increment;
}

function calculateDecrementedDuration(duration, increment) {
  validatePositiveInteger({ duration });
  validatePositiveInteger({ increment });
  const diff = duration - increment;
  if (diff < increment) {
    return max([duration - 1, 1]);
  }
  return diff;
}
export const newMeditationChainedEvents = [
  {
    onEvent: newMeditationEvents.lessMeditationTimeRequested,
    thenDispatch: newMeditationEvents.setMeditationDurationRequested,
    withPayload: ({ state }) => ({
      meditationDurationInMinutes: calculateDecrementedDuration(
        state.ownState.meditationDurationInMinutes,
        state.ownState.meditationIncrementInMinutes,
      ),
    }),
  },
  {
    onEvent: newMeditationEvents.moreMeditationTimeRequested,
    thenDispatch: newMeditationEvents.setMeditationDurationRequested,
    withPayload: ({ state }) => ({
      meditationDurationInMinutes: calculateIncrementedDuration(
        state.ownState.meditationDurationInMinutes,
        state.ownState.meditationIncrementInMinutes,
      ),
    }),
  },
];
