import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { emailVerificationEvents } from "domain/src/components/email-verification/email-verification.events.js";

export const createEmailVerificationEffects = (
  { emailVerificationService },
  rootVM
) => {
  const dispatchers = rootVM.children.account.children.emailVerification.dispatchers;
  // sendVerificationMailRequested
  const sendVerificationMailRequested = async ({email}) => {
    const status = await emailVerificationService.requestEmailVerification();
    dispatchers.checkStatusCompleted({ status }, false);
  };
  // checkStatusRequested
  const checkStatusRequested = async ({}) => {
    const status =
      await emailVerificationService.checkStatus();
    dispatchers.checkStatusCompleted({ status }, false);
  };
  // Schedules a send verification mail task
  const sendVerificationMailScheduledTaskRequested = async () => {
    setTimeout(
      () => {
        dispatchers.sendVerificationMailScheduledTaskTimeUp();
      },
      1000 * 60 * 60
    ); // 1 hour
  };
  // Schedules a check status task
  const checkStatusScheduledTaskRequested = async () => {
    setTimeout(() => {
      dispatchers.checkStatusScheduledTaskTimeUp();
    }, 1000 * 60); // 1 minute
  };

  return [
    createEffect({
      afterEvent: emailVerificationEvents.checkStatusRequested,
      then: checkStatusRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.sendVerificationMailRequested,
      then: sendVerificationMailRequested,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.sendVerificationMailScheduledTaskRequested,
      then: sendVerificationMailScheduledTaskRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.checkStatusScheduledTaskRequested,
      then: checkStatusScheduledTaskRequested,
    }),
  ];
};
