import { loadEnvironmentProperties } from "../src/config/environment.properties.js";
import { resolveDependencies } from "../src/config/resolveDependencies.js";
import { startHttpServer } from "../src/adapters/http-server.js";
import { mockProviders } from "./mock.providers.js";
import { providers } from "../src/config/production.providers.js";
// load environment properties
const environmentProperties = loadEnvironmentProperties();

// check if the environment is test
if (environmentProperties.environment !== "test") {
  throw new Error("This file should only be run in test mode");
}

const testProviders = {
  ...providers,
  ...mockProviders
}

// start server
startHttpServer(resolveDependencies(testProviders).serverConfig);
