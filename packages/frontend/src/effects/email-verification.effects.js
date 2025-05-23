import { createEffect } from 'domain/src/lib/state-manager/create-effect.js'
import { emailVerificationEvents } from 'domain/src/components/email-verification/email-verification.events.js'

export const createEmailVerificationEffects = (
  { emailVerificationService },
  rootVM
) => {
  const dispatchers = rootVM.children.account.children.emailVerification.dispatchers

  // createEmailVerificationRequested
  const createEmailVerificationRequested = async ({ email }) => {
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
  let createEmailVerificationScheduledTaskId = null
  const createEmailVerificationScheduledTaskRequested = async () => {
    createEmailVerificationScheduledTaskId = setTimeout(
      () => {
        dispatchers.createEmailVerificationScheduledTaskTimeUp()
      },
      1000 * 60 * 60
    ) // 1 hour
  }
  // Cancels the send verification mail task
  const createEmailVerificationScheduledTaskCancelled = async () => {
    if (createEmailVerificationScheduledTaskId) {
      clearTimeout(createEmailVerificationScheduledTaskId)
      createEmailVerificationScheduledTaskId = null
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
      afterEvent: emailVerificationEvents.createEmailVerificationRequested,
      then: createEmailVerificationRequested,
    }),
    createEffect({
      afterEvent:
      emailVerificationEvents.createEmailVerificationScheduledTaskRequested,
      then: createEmailVerificationScheduledTaskRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.checkStatusScheduledTaskRequested,
      then: checkStatusScheduledTaskRequested,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.createEmailVerificationScheduledTaskCancelled,
      then: createEmailVerificationScheduledTaskCancelled,
    }),
    createEffect({
      afterEvent: emailVerificationEvents.checkStatusScheduledTaskCancelled,
      then: checkStatusScheduledTaskCancelled,
    }),
  ]
}
