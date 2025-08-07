import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { loginErrorCode } from "domain/src/models/account.model.js";
import { loginFormEvents } from "domain/src/components/login-form/login-form.events.js";

export const loginEffects = ({ accountApi }, rootVM) => {
  const dispatchers = rootVM.children.account.children.loginForm.dispatchers;

  const loginRequested = async ({ login }) => {
    let account;
    try {
      account = await accountApi.login({ login });
    } catch (error) {
      console.error(error);
      dispatchers.loginFailed({
        error,
        errorCodes: [loginErrorCode.UNKNOWN_ERROR],
      });
      return;
    }
    if (
      typeof account.errorCodes === "undefined" ||
      account.errorCodes.length === 0
    ) {
      dispatchers.loginSucceeded({ userToken: account.userToken, login });
    } else {
      dispatchers.loginFailed({ errorCodes: account.errorCodes });
    }
  };

  return [
    createEffect({
      afterEvent: loginFormEvents.loginRequested,
      onComponent: ["account", "loginForm"],
      then: loginRequested,
    }),
  ];
};
