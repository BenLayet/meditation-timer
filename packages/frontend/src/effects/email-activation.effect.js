import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { accountEvents } from "domain/src/components/account/account.events.js";

export const createEmailActivationEffects = (
  { emailActivationService, keyValueStorageService },
  rootVM
) => {
  // This function is called when the user requests email verification
  const sendEmailActivationRequested = async (payload) => {
    console.debug("emailActivation effect", payload);
    const { email } = payload;
    const dispatchers = rootVM.children.account.dispatchers;
    try {
      const {createUserToken} =
        await emailActivationService.requestEmailActivation(email);
      keyValueStorageService.set("createUserToken", createUserToken);
      dispatchers.sendEmailActivationSuccceeded({ email, createUserToken });
      dispatchers.scheduledCreateUserRequested({ createUserToken });
    } catch (error) {
      console.error(error);
      dispatchers.sendEmailActivationFailed({ errorMessage: error.message });
    }
  };
  // Schedules a create user task
  const scheduledCreateUserRequested = async () => {
    setTimeout(() => {
      const dispatchers = rootVM.children.account.dispatchers;
      dispatchers.scheduledCreateUserTimeUp();
    }, 1000 * 60);
  };

  // Requests the creation of a user
  const createUserRequested = async (payload) => {
    const createUserToken = await keyValueStorageService.get("createUserToken");
    const dispatchers = rootVM.children.account.dispatchers;
    try {
      const {userToken} = await emailActivationService.createUser(createUserToken);
      keyValueStorageService.delete("createUserToken");
      keyValueStorageService.set("userToken", userToken);
      dispatchers.createUserSuccceeded();
    } catch (error) {
      console.error(error);
      dispatchers.createUserFailed({ errorMessage: error.message });
    }
  };

  return [
    createEffect({
      afterEvent: accountEvents.sendEmailActivationRequested,
      then: sendEmailActivationRequested,
    }),
    createEffect({
      afterEvent: accountEvents.scheduledCreateUserRequested,
      then: scheduledCreateUserRequested,
    }),
    createEffect({
      afterEvent: accountEvents.createUserRequested,
      then: createUserRequested,
    }),
  ];
};
