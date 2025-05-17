import { createEffect } from "domain/src/lib/state-manager/create-effect.js";

import { persistentStateEvents } from 'domain/src/components/persistent-state/persistent-state.events.js';

export const createPersistentStateEffects =  ({ keyValueStorageService }, rootVM) => {

  const persistentStateLoadRequested = async () => {
    const   createUserToken =   await keyValueStorageService.get("createUserToken");
    rootVM.children.persistentState.dispatchers.persistentStateLoaded({createUserToken});
  };

  return [
    createEffect({
      afterEvent: persistentStateEvents.persistentStateLoadRequested,
      then: persistentStateLoadRequested,
    }),
  ];
};
