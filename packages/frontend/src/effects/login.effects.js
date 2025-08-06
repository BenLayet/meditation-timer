import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { loginErrorCode } from "domain/src/models/account.model.js";
import { loginFormEvents } from "domain/src/components/login-form/login-form.events.js";

export const loginEffects = ({ accountApi }, rootVM) => {
  const dispatchers = rootVM.children.account.children.loginForm.dispatchers;

  const loginRequested = async ({ login }) => {
    try {
      const account = await accountApi.login({ login });
      if (account.errorCodes?.length === 0) {
        dispatchers.loginSucceeded({ account });
      } else {
        dispatchers.loginFailed({ errorCodes: account.errorCodes });
      }
    } catch (error) {
      console.error(error);
      dispatchers.loginFailed({
        error,
        errorCodes: [loginErrorCode.UNKNOWN_ERROR],
      });
    }
  };

  return [
    createEffect({
      afterEvent: loginFormEvents.formSubmitted,
      then: loginRequested,
    }),
  ];
};
