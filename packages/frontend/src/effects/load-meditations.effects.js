import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { statisticsEvents } from "domain/src/components/statistics/statistics.events.js";

export const loadMeditationsEffects = ({ meditationService }, rootVM) => {
  const loadMeditations = async () => {
    // Statistics dispatchers
    const dispatchers = rootVM.children.statistics.dispatchers;
    try {
      const meditationHistory = await meditationService.getAllMeditations();
      const currentEpochDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
      dispatchers.meditationHistoryRetrieved(
        {
          meditationHistory,
          currentEpochDay,
        },
        false,
      );
    } catch (error) {
      console.error(error);
      dispatchers.meditationHistoryFailed({ error });
    }
  };

  return [
    createEffect({
      afterEvent: statisticsEvents.meditationHistoryRequested,
      then: loadMeditations,
    }),
  ];
};
