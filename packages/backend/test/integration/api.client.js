import { createFakeEndPoint } from "./fake-http-server.js";
import { dependencies } from "./global-setup.js";

export const apiClient = {
  //health
  healthCheck: createFakeEndPoint(dependencies.healthCheckHandler),

  //events
  postEvent: createFakeEndPoint(dependencies.postEventHandler),
  getEventPage: createFakeEndPoint(dependencies.getEventPageHandler),
};
