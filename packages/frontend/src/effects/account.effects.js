import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { accountEvents } from "domain/src/components/account/account.events.js";
import { accountStatus } from "domain/src/components/account/account.state.js";

export const createAccountEffects = ({ keyValueStorageService }, rootVM) => {
  const dispatchers = rootVM.children.account.dispatchers;

  //createAccountRequested
  const createAccountRequested = async ({ email }) => {
    await keyValueStorageService.set("account", {
      email,
      status: accountStatus.PENDING_VERIFICATION,
    });
    dispatchers.accountCreated({ email });
  };

  //loadAccountRequested
  const loadAccountRequested = async () => {
    const account = await keyValueStorageService.get("account");
    dispatchers.accountLoaded({ account });
  };

  //accountAuthenticated
  const accountAuthenticated = async () => {
    const account = await keyValueStorageService.get("account");
    if (account) {
      account.status = accountStatus.AUTHENTICATED;
      await keyValueStorageService.set("account", account);
    } else {
      console.warn("No account found during authentication.");
    }
  };

  //disconnectRequested
  const disconnectRequested = async () => {
    await keyValueStorageService.delete("account");
    dispatchers.disconnectSucceeded();
  };

  return [
    createEffect({
      afterEvent: accountEvents.createAccountRequested,
      then: createAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.loadAccountRequested,
      then: loadAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.accountAuthenticated,
      then: accountAuthenticated,
    }),
    createEffect({
      afterEvent: accountEvents.disconnectRequested,
      then: disconnectRequested,
    }),
  ];
};
