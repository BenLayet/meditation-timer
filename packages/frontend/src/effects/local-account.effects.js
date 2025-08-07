import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { accountEvents } from "domain/src/components/account/account.events.js";
import { accountStatus } from "domain/src/models/account.model.js";

export const localAccountEffects = ({ keyValueStorageService }, rootVM) => {
  const dispatchers = rootVM.children.account.dispatchers;
  //loadAccountRequested
  const loadAccountRequested = async () => {
    const account = await keyValueStorageService.get("account");
    dispatchers.accountLoaded({ account });
  };

  //accountNewlyAuthenticated
  const accountNewlyAuthenticated = async ({ userToken, login }) => {
    const account = { status: accountStatus.AUTHENTICATED, userToken, login };
    await keyValueStorageService.set("account", account);
  };

  //disconnectRequested
  const disconnectRequested = async () => {
    await keyValueStorageService.delete("account");
    dispatchers.disconnectSucceeded();
  };

  return [
    createEffect({
      afterEvent: accountEvents.loadAccountRequested,
      then: loadAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.accountNewlyAuthenticated,
      then: accountNewlyAuthenticated,
    }),
    createEffect({
      afterEvent: accountEvents.disconnectRequested,
      then: disconnectRequested,
    }),
  ];
};
