import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { synchronizationEvents } from "domain/src/features/synchronization/synchronization.events.js";
import { currentEpochSeconds } from "../lib/time.functions.js";

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
