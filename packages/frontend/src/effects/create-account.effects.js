import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { createAccountFormErrorCode } from "domain/src/models/account.model.js";
import { createAccountFormEvents } from "domain/src/components/create-account-form/create-account-form.events.js";

export const createAccountEffects = ({ accountApi }, rootVM) => {
  const dispatchers =
    rootVM.children.account.children.createAccountForm.dispatchers;

  const createAccountRequested = async ({ login }) => {
    try {
      const account = await accountApi.createAccount({ login });
      if (account.errorCodes?.length === 0) {
        dispatchers.createAccountSucceeded({ account });
      } else {
        dispatchers.createAccountFailed({ errorCodes: account.errorCodes });
      }
    } catch (error) {
      console.error(error);
      dispatchers.createAccountFailed({
        error,
        errorCodes: [createAccountFormErrorCode.UNKNOWN_ERROR],
      });
    }
  };

  return [
    createEffect({
      afterEvent: createAccountFormEvents.formSubmitted,
      then: createAccountRequested,
    }),
  ];
};
