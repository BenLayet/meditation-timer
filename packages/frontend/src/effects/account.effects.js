import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { accountEvents } from "domain/src/components/account/account.events.js";
import { accountStatus } from "domain/src/components/account/account.state.js";

export const createAccountEffects = (
  { keyValueStorageService },
  rootVM
) => {
  //loadAccountRequested
  const loadAccountRequested = async () => {
    //TODO : fix architecture : email stored in effect but retrieved in service
    const email = await keyValueStorageService.get("email");
    const status =
      (await keyValueStorageService.get("accountStatus")) ??
      accountStatus.ANONYMOUS;
    rootVM.children.account.dispatchers.accountLoaded(
      {
        email,
        status,
      },
      false
    );
  };

  //createAccountRequested
  const createAccountRequested = async ({email}) => {
    await keyValueStorageService.set("email", email);
    await keyValueStorageService.set("accountStatus", accountStatus.PENDING_VERIFICATION);
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
  ];
};
