import { loadEnvironmentProperties } from "../src/config/environment.properties.js";
import { resolveDependencies } from "../src/config/resolveDependencies.js";
import { startHttpServer } from "../src/adapters/http-server.js";
import { mockProviders } from "./mock.providers.js";
import { providers } from "../src/config/production.providers.js";

const testProviders = {
  ...providers,
  ...mockProviders
}

// resolve dependencies
const resolved = await resolveDependencies(testProviders);
// start server
startHttpServer(resolved.serverConfig);
