import { retrieveVerification } from "../usecase/email-verification/retrieve-verification.usecase.js";
import { sendVerificationLink } from "../usecase/email-verification/send-verification-link.usecase.js";
import { verifyEmailAddress } from "../usecase/email-verification/verify-email-address.usecase.js";
import { healthCheck } from "../usecase/health/check.health.js";

export const usecaseProviders = {
  sendVerificationLink,
  retrieveVerification,
  verifyEmailAddress,
  healthCheck,
};
