import { resolveDependencies } from "../src/config/resolveDependencies.js";
import { startHttpServer } from "../src/adapters/http-server.js";
import { mockProviders } from "./mock.providers.js";
import { providers } from "../src/config/providers.js";

// resolve dependencies
const dependencies = await resolveDependencies( {
  ...providers,
  ...mockProviders
});
// start server
startHttpServer(dependencies);
