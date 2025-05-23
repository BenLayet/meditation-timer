import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { accountEvents } from "domain/src/components/account/account.events.js";
import { accountStatus } from "domain/src/components/account/account.state.js";

export const createAccountEffects = ({ keyValueStorageService }, rootVM) => {
  const dispatchers = rootVM.children.account.dispatchers;

  //loadAccountRequested
  const loadAccountRequested = async () => {
    const email = await keyValueStorageService.get("email");
    const status =
      (await keyValueStorageService.get("accountStatus")) ??
      accountStatus.ANONYMOUS;
    dispatchers.accountLoaded({ email, status });
  };

  //createAccountRequested
  const createAccountRequested = async ({ email }) => {
    await keyValueStorageService.set("email", email);
    await keyValueStorageService.set(
      "accountStatus",
      accountStatus.PENDING_VERIFICATION,
    );
  };

  //disconnectRequested
  const disconnectRequested = async () => {
    await keyValueStorageService.delete("email");
    await keyValueStorageService.delete("accountStatus");
    await keyValueStorageService.delete("emailVerification");
    dispatchers.disconnectSucceeded();
  };

  return [
    createEffect({
      afterEvent: accountEvents.loadAccountRequested,
      then: loadAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.createAccountRequested,
      then: createAccountRequested,
    }),
    createEffect({
      afterEvent: accountEvents.disconnectRequested,
      then: disconnectRequested,
    }),
  ];
};
