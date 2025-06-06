import { createFakeEndPoint } from "./fake-http-server.js";
import { dependencies } from "./global-setup.js";

export const apiClient = {
  //health
  healthCheck: createFakeEndPoint(dependencies.healthCheckHandler),

  //email verification
  sendVerificationLink: createFakeEndPoint(
    dependencies.sendVerificationLinkHandler,
  ),
  verifyEmailAddress: createFakeEndPoint(
    dependencies.verifyEmailAddressHandler,
  ),
  retrieveVerification: createFakeEndPoint(
    dependencies.retrieveVerificationHandler,
  ),

  //events
  postEvent: createFakeEndPoint(dependencies.postEventHandler),
  getEventPage: createFakeEndPoint(dependencies.getEventPageHandler),
};
