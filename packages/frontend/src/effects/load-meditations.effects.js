import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { statisticsEvents } from "domain/src/features/statistics/statistics.events.js";

export const loadMeditationsEffects = ({ meditationService }, rootVM) => {
  // Statistics dispatchers
  const dispatchers = rootVM.children.statistics.dispatchers;
  const retrievePersistedMeditationHistoryRequested = async () => {
    try {
      const meditationHistory = await meditationService.getAllMeditations();
      dispatchers.retrievePersistedMeditationHistorySucceeded(
        {
          meditationHistory,
        },
        false,
      );
    } catch (error) {
      console.error(error);
    }
  };
  const currentDayRequested = async () => {
    const currentEpochDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
    dispatchers.currentDayObtained({ currentEpochDay });
  };

  return [
    createEffect({
      afterEvent: statisticsEvents.retrievePersistedMeditationHistoryRequested,
      then: retrievePersistedMeditationHistoryRequested,
    }),
    createEffect({
      afterEvent: statisticsEvents.currentDayRequested,
      then: currentDayRequested,
    }),
  ];
};
