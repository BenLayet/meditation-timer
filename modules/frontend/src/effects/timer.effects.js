import { createEffect } from "@softersoftware/state-manager/create-effect";
import { actualMeditationEvents } from "@meditation-timer/domain/src/features/actual-meditation/actual-meditation.events.js";
import { preparationEvents } from "@meditation-timer/domain/src/features/preparation/preparation.events.js";

export const timerEffects = ({ tickingService }, rootVM) => {
  const startTimer = (events, componentName) => () =>
    tickingService.startTicking(componentName, (currentTimeInSeconds) =>
      events.timerTicked({ currentTimeInSeconds }),
    );

  const stopTimer = (componentName) => () =>
    tickingService.stopTicking(componentName);

  // Preparation Timer Events
  const preparationVmEvents =
    rootVM.children.meditationSession.children.preparation.dispatchers;
  // Actual Meditation Events
  const actualMeditationVmEvents =
    rootVM.children.meditationSession.children.actualMeditation.dispatchers;

  return [
    createEffect({
      afterEvent: preparationEvents.timerStartRequested,
      onComponent: ["meditationSession", "preparation"],
      then: startTimer(preparationVmEvents, "preparation"),
    }),
    createEffect({
      afterEvent: preparationEvents.timerStopRequested,
      onComponent: ["meditationSession", "preparation"],
      then: stopTimer("preparation"),
    }),
    createEffect({
      afterEvent: actualMeditationEvents.timerStartRequested,
      onComponent: ["meditationSession", "actualMeditation"],
      then: startTimer(actualMeditationVmEvents, "actualMeditation"),
    }),
    createEffect({
      afterEvent: actualMeditationEvents.timerStopRequested,
      onComponent: ["meditationSession", "actualMeditation"],
      then: stopTimer("actualMeditation"),
    }),
  ];
};
