import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { statisticsEvents } from "domain/src/features/statistics/statistics.events.js";
import { currentEpochDay } from "../lib/time.functions.js";

export const loadMeditationsEffects = (
  { meditationService, resetSynchronizationService },
  rootVM,
) => {
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
  const currentDayRequested = async () =>
    dispatchers.currentDayObtained({ currentEpochDay: currentEpochDay() });

  const clearMeditationHistoryRequested = async () => {
    await resetSynchronizationService.reset();
    dispatchers.clearMeditationHistorySucceeded();
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
    createEffect({
      afterEvent: statisticsEvents.clearMeditationHistoryRequested,
      then: clearMeditationHistoryRequested,
    }),
  ];
};
