import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { actualMeditationEvents } from "domain/src/components/actual-meditation/actual-meditation.events.js";

export const createSaveMeditationEffects = ({ meditationService }, rootVM) => {
  const saveMeditation = async (payload) => {
    // actual Meditation dispatchers
    const dispatchers =
      rootVM.children.meditationSession.children.actualMeditation.dispatchers;
    try {
      await meditationService.saveMeditation(payload);
      dispatchers.saveSucceeded();
    } catch (error) {
      console.error(error);
      dispatchers.saveFailed({ error });
    }
  };

  return [
    createEffect({
      afterEvent: actualMeditationEvents.saveRequested,
      then: saveMeditation,
    }),
  ];
};
