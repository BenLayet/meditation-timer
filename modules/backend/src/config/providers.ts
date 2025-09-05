import { datasourceProviders } from "./datasource.providers.js";
import { repositoryProviders } from "./repository.providers.js";
import { usecaseProviders } from "./usecase.providers.js";
import { cleanUpTaskProviders } from "./clean-up-task.providers.js";
import { endpointHandlerProviders } from "./endpoint-handler.providers.js";
import { environmentProviders } from "./environment.providers.js";
import { apiPropertiesProviders } from "./api-properties.providers.js";
import { loggerProviders } from "./logger.providers.js";
import { uuidGeneratorProviders } from "./uuid-generator.providers.js";
import { tokenServiceProviders } from "./token-service.providers.js";
import { routeProviders } from "./route.providers.js";
import { errorHandlerProviders } from "./error-handler.providers.js";
import { passwordHasherProviders } from "./password-hasher.providers.js";

export const providers = {
  ...environmentProviders,
  ...loggerProviders,
  ...datasourceProviders,
  ...apiPropertiesProviders,
  ...routeProviders,
  ...uuidGeneratorProviders,
  ...tokenServiceProviders,
  ...passwordHasherProviders,
  ...repositoryProviders,
  ...usecaseProviders,
  ...endpointHandlerProviders,
  ...cleanUpTaskProviders,
  ...errorHandlerProviders,
};
