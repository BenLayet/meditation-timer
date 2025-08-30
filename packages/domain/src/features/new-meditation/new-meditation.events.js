import { floor, max } from "lodash-es";
import ow from "ow";

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
    payloadShape: {
      meditationDurationInMinutes: ow.number.integer.positive,
    },
    handler: (state, payload) => ({
      ...state,
      meditationDurationInMinutes: payload.meditationDurationInMinutes,
    }),
  },
  startSessionRequested: {
    eventType: "startSessionRequested",
    payloadShape: {
      currentTimeInSeconds: ow.number.integer.positive,
    },
    isNewCycle: true,
  },
};
