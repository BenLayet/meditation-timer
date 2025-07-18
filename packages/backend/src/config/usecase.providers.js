import { retrieveVerification } from "../usecases/email-verification/retrieve-verification.usecase.js";
import { sendVerificationLink } from "../usecases/email-verification/send-verification-link.usecase.js";
import { verifyEmailAddress } from "../usecases/email-verification/verify-email-address.usecase.js";
import { healthCheck } from "../usecases/health/check.health.js";
import { getEventPage } from "../usecases/events/get-event-page.usecase.js";
import { postEvent } from "../usecases/events/post-event.usecase.js";

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
