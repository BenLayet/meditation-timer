import { healthCheckUsecase } from "../usecases/health/check.health.js";
import { getEventPage } from "../usecases/events/get-event-page.usecase.js";
import { postEvent } from "../usecases/events/post-event.usecase.js";
import { loginUsecase } from "../usecases/account/login.usecase.js";
import { createAccountUsecase } from "../usecases/account/create-account.usecase.js";

export const usecaseProviders = {
  //health
  healthCheckUsecase,

  //account
  createAccountUsecase,
  loginUsecase,

  //events
  postEvent,
  getEventPage,
};
