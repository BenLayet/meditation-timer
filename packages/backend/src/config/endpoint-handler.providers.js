import { healthCheckHandler } from "../route-handlers/health-check.handler.js";
import {
  retrieveVerificationHandler,
  sendVerificationLinkHandler,
  verifyEmailAddressHandler,
} from "../route-handlers/email-verifications.handler.js";
import {
  getEventPageHandler,
  postEventHandler,
} from "../route-handlers/events.handler.js";

export const endpointHandlerProviders = {
  //health
  healthCheckHandler,

  //email verification
  sendVerificationLinkHandler,
  verifyEmailAddressHandler,
  retrieveVerificationHandler,

  //events
  postEventHandler,
  getEventPageHandler,
};
