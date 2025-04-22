import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { actualMeditationEvents } from "domain/src/components/actual-meditation/actual-meditation.events.js";
import { statisticsEvents } from "domain/src/components/statistics/statistics.events.js"  ;

export const createMeditationStoreEffects = ({ meditationService }, rootVM) => {
  const saveMeditation = async (event) => {
    // actual Meditation dispatchers
    const dispatchers =
      rootVM.children.meditationSession.children.actualMeditation.dispatchers;
    try {
      await meditationService.saveMeditation(event.payload);
      dispatchers.saveSucceeded();
    } catch (error) {
      console.error(error);
      dispatchers.saveFailed({ error });
    }
  };

  const loadMeditations = async () => {
    // Statistics dispatchers
    const dispatchers = rootVM.children.statistics.dispatchers;
    try {
      const meditations = await meditationStorage.getAllMeditations();
      const currentEpochDay = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
      dispatchers.meditationHistoryRetrieved({
        meditations,
        currentEpochDay,
      });
    } catch (error) {
      console.error(error);
      dispatchers.meditationHistoryFailed({ error });
    }
  };

  return [
    createEffect({
      afterEvent: actualMeditationEvents.saveRequested,
      then: saveMeditation,
    }),
    createEffect({
      afterEvent: statisticsEvents.meditationHistoryRequested,
      then: loadMeditations,
    }),
  ];
};
