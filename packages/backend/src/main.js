import { resolveDependencies } from "./config/resolveDependencies.js";
import { providers } from "./config/providers.js";
import { startHttpServer } from "./adapters/http-server.js";
// resolve dependencies
const dependencies = await resolveDependencies(providers);
// start server
startHttpServer(dependencies);
