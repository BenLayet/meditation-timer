import { retrieveVerification } from "../usecase/email-verification/retrieve-verification.usecase.js";
import { sendVerificationLink } from "../usecase/email-verification/send-verification-link.usecase.js";
import { verifyEmailAddress } from "../usecase/email-verification/verify-email-address.usecase.js";
import { healthCheck } from "../usecase/health/check.health.js";
import { getEventPage } from "../usecase/events/get-event-page.usecase.js";
import { postEvent } from "../usecase/events/post-event.usecase.js";

export const usecaseProviders = {
  //health
  healthCheck,

  //email verification
  sendVerificationLink,
  retrieveVerification,
  verifyEmailAddress,

  //events
  postEvent,
  getEventPage,
};
