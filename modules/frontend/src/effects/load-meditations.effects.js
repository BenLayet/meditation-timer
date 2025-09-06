import { createEffect } from "@softersoftware/state-manager/create-effect";
import { statisticsEvents } from "@meditation-timer/domain/src/features/statistics/statistics.events.js";
import { currentEpochDay } from "@softersoftware/functions/time.functions";

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
