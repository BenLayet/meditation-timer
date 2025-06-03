import { datasourceProviders } from "./datasource.providers.js";
import { serviceProviders } from "./service.providers.js";
import { usecaseProviders } from "./usecase.providers.js";
import { cleanUpTaskProviders } from "./clean-up-task.providers.js";
import { endpointHandlerProviders } from "./endpoint-handler.providers.js";

export const providers = {
  ...datasourceProviders,
  ...serviceProviders,
  ...usecaseProviders,
  ...endpointHandlerProviders,
  ...cleanUpTaskProviders,
};
