import { createFakeEndPoint } from "./fake-http-server.js";
import { dependencies } from "./global-setup.js";

export const apiClient = {
  //health
  healthCheck: createFakeEndPoint(
    dependencies.healthCheckHandler,
    dependencies.errorHandler,
  ),

  //account
  createAccount: createFakeEndPoint(
    dependencies.createAccountHandler,
    dependencies.errorHandler,
  ),
  login: createFakeEndPoint(
    dependencies.loginHandler,
    dependencies.errorHandler,
  ),

  //events
  postEvent: createFakeEndPoint(
    dependencies.postEventHandler,
    dependencies.errorHandler,
  ),
  getEventPage: createFakeEndPoint(
    dependencies.getEventPageHandler,
    dependencies.errorHandler,
  ),
};
