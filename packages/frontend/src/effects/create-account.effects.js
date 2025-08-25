import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { createAccountErrorCodes } from "domain/src/models/account.model.js";
import { createAccountFormEvents } from "domain/src/components/create-account-form/create-account-form.events.js";

export const createAccountEffects = ({ accountApi }, rootVM) => {
  const dispatchers =
    rootVM.children.localStorageAccount.children.createAccountForm.dispatchers;

  const createAccountRequested = async ({ login, password }) => {
    let account;
    try {
      account = await accountApi.createAccount({ login, password });
    } catch (error) {
      console.error(error);
      dispatchers.createAccountFailed({
        error,
        errorCodes: [createAccountErrorCodes.SERVER_UNREACHABLE],
      });
      return;
    }
    if (
      typeof account.errorCodes === "undefined" ||
      account.errorCodes.length === 0
    ) {
      dispatchers.createAccountSucceeded({
        userToken: account.userToken,
        login,
      });
    } else {
      dispatchers.createAccountFailed({ errorCodes: account.errorCodes });
    }
  };

  return [
    createEffect({
      afterEvent: createAccountFormEvents.createAccountRequested,
      onComponent: ["account", "createAccountForm"],
      then: createAccountRequested,
    }),
  ];
};
