import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { accountEvents } from "domain/src/components/account/account.events.js";

export const createEmailActivationEffects = ({ emailActivationService }, rootVM) => {
  const emailActivation = async ({email}) => {
    const dispatchers =
      rootVM.children.account.dispatchers;
    try {
      await emailActivationService.requestEmailActivation(email);
      dispatchers.sendEmailActivationSuccceeded({email});
    } catch (error) {
      console.error(error);
      dispatchers.sendEmailActivationFailed({ errorMessage: error.message });
    }
  };

  return [
    createEffect({
      afterEvent: accountEvents.sendEmailActivationRequested,
      then: emailActivation,
    }),
  ];
};
