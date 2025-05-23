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
    dispatchers.refreshEmailVerificationCompleted({ status });
  };
  // refreshEmailVerificationRequested
  const refreshEmailVerificationRequested = async () => {
    const { status } =
      await emailVerificationService.refreshEmailVerificationRequested();
    dispatchers.refreshEmailVerificationCompleted({ status });
  };

  // Schedules a send verification mail task
  let createEmailVerificationScheduledTaskId = null;
  const createEmailVerificationScheduledTaskRequested = async () => {
    if (createEmailVerificationScheduledTaskId) {
      clearTimeout(createEmailVerificationScheduledTaskId);
      createEmailVerificationScheduledTaskId = null;
    }
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
  let refreshEmailVerificationScheduledTaskId = null;
  const refreshEmailVerificationScheduledTaskRequested = async ({ email }) => {
    if (refreshEmailVerificationScheduledTaskId) {
      clearTimeout(refreshEmailVerificationScheduledTaskId);
      refreshEmailVerificationScheduledTaskId = null;
    }
    refreshEmailVerificationScheduledTaskId = setTimeout(() => {
      dispatchers.refreshEmailVerificationScheduledTaskTimeUp(email);
    }, 1000 * 60); // 1 minute
  };
  // Cancels the check status task
  const refreshEmailVerificationScheduledTaskCancelled = async () => {
    if (refreshEmailVerificationScheduledTaskId) {
      clearTimeout(refreshEmailVerificationScheduledTaskId);
      refreshEmailVerificationScheduledTaskId = null;
    }
  };

  return [
    createEffect({
      afterEvent: emailVerificationEvents.refreshEmailVerificationRequested,
      then: refreshEmailVerificationRequested,
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
        emailVerificationEvents.refreshEmailVerificationScheduledTaskRequested,
      then: refreshEmailVerificationScheduledTaskRequested,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.createEmailVerificationScheduledTaskCancelled,
      then: createEmailVerificationScheduledTaskCancelled,
    }),
    createEffect({
      afterEvent:
        emailVerificationEvents.refreshEmailVerificationScheduledTaskCancelled,
      then: refreshEmailVerificationScheduledTaskCancelled,
    }),
  ];
};
