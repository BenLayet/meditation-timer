import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { statisticsEvents } from "domain/src/components/statistics/statistics.events.js";

export const createLoadMeditationsEffects = ({ meditationService }, rootVM) => {
  const loadMeditations = async () => {
    // Statistics dispatchers
    const dispatchers = rootVM.children.statistics.dispatchers;
    try {
      const meditations = await meditationService.getAllMeditations();
      const currentEpochDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
      dispatchers.meditationHistoryRetrieved(
        {
          meditations,
          currentEpochDay,
        },
        false,
      );
    } catch (error) {
      console.error(error);
      dispatchers.meditationHistoryFailed({ error }, false);
    }
  };

  return [
    createEffect({
      afterEvent: statisticsEvents.meditationHistoryRequested,
      then: loadMeditations,
    }),
  ];
};
