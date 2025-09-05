import { createEffect } from "@softersoftware/state-manager/create-effect.js";
import { loginErrorCodes } from "@meditation-timer/domain/src/models/account.model.js";
import { loginFormEvents } from "@meditation-timer/domain/src/features/login-form/login-form.events.js";

export const loginEffects = ({ accountApi }, rootVM) => {
  const dispatchers = rootVM.children.account.children.loginForm.dispatchers;

  const loginRequested = async ({ login, password }) => {
    let account;
    try {
      account = await accountApi.login({ login, password });
    } catch (error) {
      console.error(error);
      dispatchers.loginFailed({
        error,
        errorCodes: [loginErrorCodes.SERVER_UNREACHABLE],
      });
      return;
    }
    if (
      typeof account.errorCodes === "undefined" ||
      account.errorCodes.length === 0
    ) {
      dispatchers.loginSucceeded({
        account: { userToken: account.userToken, login },
      });
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
