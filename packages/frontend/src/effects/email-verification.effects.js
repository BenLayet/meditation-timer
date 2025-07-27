import { createEffect } from "domain/src/lib/state-manager/create-effect.js";
import { emailVerificationEvents } from "domain/src/components/email-verification/email-verification.events.js";

export const createEmailVerificationEffects = (
  { emailVerificationService },
  rootVM,
) => {
  const dispatchers =
    rootVM.children.account.children.emailVerification.dispatchers;

  // createRequested
  const createRequested = async ({ email }) => {
    await emailVerificationService.storeNewEmailVerification(email);
    dispatchers.createSucceeded();
  };
  // loadStatusRequested
  const loadStatusRequested = async () => {
    const { status } =
      await emailVerificationService.loadLocalEmailVerification();
    dispatchers.statusLoaded({ status });
  };
  //verificationLinkRequested
  const verificationLinkRequested = async () => {
    try {
      await emailVerificationService.sendVerificationLink();
      dispatchers.verificationLinkSent();
    } catch (error) {
      console.warn(error);
      //this is expected when offline
      dispatchers.verificationLinkFailed({ error });
    }
  };
  let scheduledRefreshTimeoutId = null;
  // cancelScheduledRefreshRequested
  const cancelScheduledRefreshRequested = () => {
    if (scheduledRefreshTimeoutId) {
      clearTimeout(scheduledRefreshTimeoutId);
      scheduledRefreshTimeoutId = null;
    }
  };
  // scheduleRefreshRequested
  const scheduleRefreshRequested = async () => {
    cancelScheduledRefreshRequested();
    scheduledRefreshTimeoutId = setTimeout(
      dispatchers.refreshTimeUp,
      1000 * 60,
    ); // 1 minute
  };

  // refreshRequested
  const refreshRequested = async () => {
    const { status, userToken } =
      await emailVerificationService.refreshStoredEmailVerification();
    dispatchers.refreshCompleted({ status, userToken });
  };
  // Cancels the check status task
  const resetRequested = emailVerificationService.deleteStoredEmailVerification;

  return [
    createEffect({
      afterEvent: emailVerificationEvents.createRequested,
      then: createRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.loadStatusRequested,
      then: loadStatusRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.verificationLinkRequested,
      then: verificationLinkRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.scheduleRefreshRequested,
      then: scheduleRefreshRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.cancelScheduledRefreshRequested,
      then: cancelScheduledRefreshRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.refreshRequested,
      then: refreshRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.resetRequested,
      then: resetRequested,
    }),
  ];
};
