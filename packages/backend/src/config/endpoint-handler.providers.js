import { healthCheckHandler } from "../route-handlers/health-check.handler.js";
import {
  getEventPageHandler,
  postEventHandler,
} from "../route-handlers/events.handler.js";
import {
  createAccountHandler,
  loginHandler,
} from "../route-handlers/account.handler.js";

export const endpointHandlerProviders = {
  //health
  healthCheckHandler,

  //account
  createAccountHandler,
  loginHandler,

  //events
  postEventHandler,
  getEventPageHandler,
};
