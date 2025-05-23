import { createEffect } from 'domain/src/lib/state-manager/create-effect.js'
import { emailVerificationEvents } from 'domain/src/components/email-verification/email-verification.events.js'

export const createEmailVerificationEffects = (
  { emailVerificationService },
  rootVM
) => {
  const dispatchers = rootVM.children.account.children.emailVerification.dispatchers

  // sendVerificationMailRequested
  const sendVerificationMailRequested = async ({ email }) => {
    const { status } = await emailVerificationService.createEmailVerification(email)
    dispatchers.checkStatusCompleted({ status })
  }
  // checkStatusRequested
  const checkStatusRequested = async ({ email }) => {
    const { status } =
      await emailVerificationService.getEmailVerification(email)
    dispatchers.checkStatusCompleted({ status })
  }

  // Schedules a send verification mail task
  let sendVerificationMailScheduledTaskId = null
  const sendVerificationMailScheduledTaskRequested = async () => {
    sendVerificationMailScheduledTaskId = setTimeout(
      () => {
        dispatchers.sendVerificationMailScheduledTaskTimeUp()
      },
      1000 * 60 * 60
    ) // 1 hour
  }
  // Cancels the send verification mail task
  const sendVerificationMailScheduledTaskCancelled = async () => {
    if (sendVerificationMailScheduledTaskId) {
      clearTimeout(sendVerificationMailScheduledTaskId)
      sendVerificationMailScheduledTaskId = null
    }
  }

  // Schedules a check status task
  let checkStatusScheduledTaskId = null
  const checkStatusScheduledTaskRequested = async ({ email }) => {
    checkStatusScheduledTaskId = setTimeout(() => {
      dispatchers.checkStatusScheduledTaskTimeUp(email)
    }, 1000 * 60) // 1 minute
  }
  // Cancels the check status task
  const checkStatusScheduledTaskCancelled = async () => {
    if (checkStatusScheduledTaskId) {
      clearTimeout(checkStatusScheduledTaskId)
      checkStatusScheduledTaskId = null
    }
  }

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
    createEffect({
      afterEvent: emailVerificationEvents.sendVerificationMailScheduledTaskCancelled,
      then: sendVerificationMailScheduledTaskCancelled,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.checkStatusScheduledTaskCancelled,
      then: checkStatusScheduledTaskCancelled,
    }),
  ]
}
