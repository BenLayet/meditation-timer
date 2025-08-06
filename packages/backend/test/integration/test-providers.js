import { repositoryProviders } from "../../src/config/repository.providers.js";
import { usecaseProviders } from "../../src/config/usecase.providers.js";
import { endpointHandlerProviders } from "../../src/config/endpoint-handler.providers.js";
import { testDatasourceProviders } from "./pgmem.datasource.js";
import { environmentProviders } from "../../src/config/environment.providers.js";
import { apiPropertiesProviders } from "../../src/config/api-properties.providers.js";
import { cleanUpTaskProviders } from "../../src/config/clean-up-task.providers.js";
import { routeProviders } from "../../src/config/route.providers.js";

export const fakeUuidGenerator = {
  nextUuid: "10000000-0000-1000-8000-000000000001",
  createUuid: () => fakeUuidGenerator.nextUuid,
};

export const fakeTokenService = {
  createPermanentToken: (payload) =>
    btoa(
      JSON.stringify({
        life: "long",
        payload,
      }),
    ),
  verify: (token) => {
    const decoded = atob(token);
    const { payload } = JSON.parse(decoded);
    return payload;
  },
};

const testServiceProviders = { ...repositoryProviders };
testServiceProviders.uuidGenerator = () => fakeUuidGenerator;
testServiceProviders.tokenService = () => fakeTokenService;

export const testProviders = {
  ...environmentProviders,
  logger: () => console,
  ...testDatasourceProviders,
  ...apiPropertiesProviders,
  ...routeProviders,
  uuidGenerator: () => fakeUuidGenerator,
  tokenService: () => fakeTokenService,
  ...repositoryProviders,
  ...usecaseProviders,
  ...endpointHandlerProviders,
  ...cleanUpTaskProviders,
  ...usecaseProviders,
  ...endpointHandlerProviders,
};
