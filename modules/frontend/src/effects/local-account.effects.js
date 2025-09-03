import { createEffect } from "@softer-software/state-manager/create-effect.js";
import { accountEvents } from "@meditation-timer/domain/src/features/account/account.events.js";
import { accountStatus } from "@meditation-timer/domain/src/models/account.model.js";

export const localAccountEffects = ({ keyValueStorageService }, rootVM) => {
  const dispatchers = rootVM.children.account.dispatchers;
  const retrievePersistedAccountRequested = async () => {
    const account = await keyValueStorageService.get("account");
    dispatchers.retrievePersistedAccountCompleted({ account });
  };
  const persistAccountRequested = async ({ account }) => {
    await keyValueStorageService.set("account", account);
  };
  const deletePersistedAccountRequested = async () => {
    await keyValueStorageService.delete("account");
    dispatchers.deletePersistedAccountCompleted();
  };

  return [
    createEffect({
      afterEvent: accountEvents.retrievePersistedAccountRequested,
      then: retrievePersistedAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.persistAccountRequested,
      then: persistAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.deletePersistedAccountRequested,
      then: deletePersistedAccountRequested,
    }),
  ];
};
