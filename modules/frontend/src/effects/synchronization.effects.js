import { createEffect } from "@softer-software/state-manager/create-effect.js";
import { synchronizationEvents } from "@meditation-timer/domain/src/features/synchronization/synchronization.events.js";
import { currentEpochSeconds } from "@softer-software/functions/time.functions.js";

export const synchronizationEffects = (
  { synchronizationTaskService },
  rootVM,
) => {
  const dispatchers =
    rootVM.children.account.children.synchronization.dispatchers;
  const synchronizationRequested = async () =>
    await synchronizationTaskService.queueSynchronizationTask({
      onSucceeded: () =>
        dispatchers.synchronizationSucceeded({
          lastSynchronizedEpochSeconds: currentEpochSeconds(),
        }),
      onStarted: dispatchers.synchronizationStarted,
      onFailed: dispatchers.synchronizationFailed,
      onNotAttempted: dispatchers.synchronizationNotAttempted,
    });

  return [
    createEffect({
      afterEvent: synchronizationEvents.synchronizationRequested,
      then: synchronizationRequested,
    }),
  ];
};
