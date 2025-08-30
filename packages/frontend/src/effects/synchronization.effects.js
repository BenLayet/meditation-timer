import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { meditationTimerAppEvents } from "domain/src/features/meditation-timer-app/meditation-timer-app.events.js";

export const synchronizationEffects = ({ synchronizationTaskService }) => {
  return [
    createEffect({
      afterEvent: meditationTimerAppEvents.synchronizationRequested,
      then: synchronizationTaskService.queueSynchronizationTask,
    }),
  ];
};
