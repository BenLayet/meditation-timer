import { createEffect } from "@softer-software/state-manager/create-effect.js";
import { statisticsEvents } from "@meditation-timer/domain/src/features/statistics/statistics.events.js";
import { currentEpochDay } from "@softer-software/functions/time.functions.js";

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
