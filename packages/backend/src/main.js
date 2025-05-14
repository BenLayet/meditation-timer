import { resolveDependencies } from "./config/resolveDependencies.js";
import { providers } from "./config/production.providers.js";
import { startHttpServer } from "./adapters/http-server.js";
// start server
startHttpServer(resolveDependencies(providers).serverConfig);
