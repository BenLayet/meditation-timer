import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationTimerAppEvents } from "domain/src/components/meditation-timer-app/meditation-timer-app.events.js";
import { actualMeditationEvents } from "domain/src/components/actual-meditation/actual-meditation.events.js";

export const synchronizationEffects = ({ synchronizationTaskService }) => {
  return [
    createEffect({
      afterEvent: meditationTimerAppEvents.onlineDetected,
      then: synchronizationTaskService.queueSynchronizationTask,
    }),
    createEffect({
      afterEvent: actualMeditationEvents.saveSucceeded,
      then: synchronizationTaskService.queueSynchronizationTask,
    }),
  ];
};
