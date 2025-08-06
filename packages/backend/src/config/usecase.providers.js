import { healthCheck } from "../usecases/health/check.health.js";
import { getEventPage } from "../usecases/events/get-event-page.usecase.js";
import { postEvent } from "../usecases/events/post-event.usecase.js";

export const usecaseProviders = {
  //health
  healthCheck,
  //events
  postEvent,
  getEventPage,
};
