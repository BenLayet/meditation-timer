import { healthCheckHandler } from "../route-handlers/health-check.handler.js";
import {
  getEventPageHandler,
  postEventHandler,
} from "../route-handlers/events.handler.js";

export const endpointHandlerProviders = {
  //health
  healthCheckHandler,

  //events
  postEventHandler,
  getEventPageHandler,
};
