import { healthCheckUsecase } from "../usecases/health/check.health.js";

export const healthCheckHandler =
  ({ healthCheckUsecase }) =>
  async (request, response) => {
    response.status(200).json(await healthCheckUsecase());
  };
