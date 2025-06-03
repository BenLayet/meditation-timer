import { createFakeEndPoint } from "./fake-http-server.js";
import { dependencies } from "./global-setup.js";

export const apiClient = {
  healthCheck: createFakeEndPoint(dependencies.healthCheckHandler),
  sendVerificationLink: createFakeEndPoint(
    dependencies.sendVerificationLinkHandler,
  ),
  verifyEmailAddress: createFakeEndPoint(
    dependencies.verifyEmailAddressHandler,
  ),
  retrieveVerification: createFakeEndPoint(
    dependencies.retrieveVerificationHandler,
  ),
};
