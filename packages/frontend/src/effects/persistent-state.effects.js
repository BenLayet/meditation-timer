import { createEffect } from "domain/src/lib/state-manager/create-effect.js";

import { persistentStateEvents } from "domain/src/components/persistent-state/persistent-state.events.js";

export const createPersistentStateEffects = (
  { keyValueStorageService },
  rootVM
) => {
  const persistentStateLoadRequested = async () => {
    const checkStatusToken = await keyValueStorageService.get("checkStatusToken");
    const email = await keyValueStorageService.get("email");
    const accountStatus = await keyValueStorageService.get("accountStatus");
    rootVM.children.persistentState.dispatchers.persistentStateLoaded({
      checkStatusToken,
      email,
      accountStatus
    }, false);
  };

  return [
    createEffect({
      afterEvent: persistentStateEvents.persistentStateLoadRequested,
      then: persistentStateLoadRequested,
    }),
  ];
};
