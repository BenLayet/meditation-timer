import { healthCheckHandler } from "../routes/health-check.handler.js";
import {
  retrieveVerificationHandler,
  sendVerificationLinkHandler,
  verifyEmailAddressHandler,
} from "../routes/email-verifications.handler.js";

export const endpointHandlerProviders = {
  healthCheckHandler,
  sendVerificationLinkHandler,
  verifyEmailAddressHandler,
  retrieveVerificationHandler,
};
