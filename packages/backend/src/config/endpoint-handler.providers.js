import { healthCheckHandler } from "../route-handlers/health-check.handler.js";
import {
  retrieveVerificationHandler,
  sendVerificationLinkHandler,
  verifyEmailAddressHandler,
} from "../route-handlers/email-verifications.handler.js";

export const endpointHandlerProviders = {
  healthCheckHandler,
  sendVerificationLinkHandler,
  verifyEmailAddressHandler,
  retrieveVerificationHandler,
};
