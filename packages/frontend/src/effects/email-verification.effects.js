import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { emailVerificationEvents } from "domain/src/components/email-verification/email-verification.events.js";

export const createEmailVerificationEffects = (
  { emailVerificationService },
  rootVM,
) => {
  const dispatchers =
    rootVM.children.account.children.emailVerification.dispatchers;

  // createEmailVerificationRequested
  const createEmailVerificationRequested = async ({ email }) => {
    const { status } =
      await emailVerificationService.createEmailVerification(email);
    dispatchers.checkIfEmailVerifiedCompleted({ status });
  };
  // checkIfEmailVerifiedRequested
  const checkIfEmailVerifiedRequested = async ({ email }) => {
    const { status } =
      await emailVerificationService.getEmailVerification(email);
    dispatchers.checkIfEmailVerifiedCompleted({ status });
  };

  // Schedules a send verification mail task
  let createEmailVerificationScheduledTaskId = null;
  const createEmailVerificationScheduledTaskRequested = async () => {
    createEmailVerificationScheduledTaskId = setTimeout(
      () => {
        dispatchers.createEmailVerificationScheduledTaskTimeUp();
      },
      1000 * 60 * 60,
    ); // 1 hour
  };
  // Cancels the send verification mail task
  const createEmailVerificationScheduledTaskCancelled = async () => {
    if (createEmailVerificationScheduledTaskId) {
      clearTimeout(createEmailVerificationScheduledTaskId);
      createEmailVerificationScheduledTaskId = null;
    }
  };

  // Schedules a check status task
  let checkIfEmailVerifiedScheduledTaskId = null;
  const checkIfEmailVerifiedScheduledTaskRequested = async ({ email }) => {
    checkIfEmailVerifiedScheduledTaskId = setTimeout(() => {
      dispatchers.checkIfEmailVerifiedScheduledTaskTimeUp(email);
    }, 1000 * 60); // 1 minute
  };
  // Cancels the check status task
  const checkIfEmailVerifiedScheduledTaskCancelled = async () => {
    if (checkIfEmailVerifiedScheduledTaskId) {
      clearTimeout(checkIfEmailVerifiedScheduledTaskId);
      checkIfEmailVerifiedScheduledTaskId = null;
    }
  };

  return [
    createEffect({
      afterEvent: emailVerificationEvents.checkIfEmailVerifiedRequested,
      then: checkIfEmailVerifiedRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.createEmailVerificationRequested,
      then: createEmailVerificationRequested,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.createEmailVerificationScheduledTaskRequested,
      then: createEmailVerificationScheduledTaskRequested,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.checkIfEmailVerifiedScheduledTaskRequested,
      then: checkIfEmailVerifiedScheduledTaskRequested,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.createEmailVerificationScheduledTaskCancelled,
      then: createEmailVerificationScheduledTaskCancelled,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.checkIfEmailVerifiedScheduledTaskCancelled,
      then: checkIfEmailVerifiedScheduledTaskCancelled,
    }),
  ];
};
