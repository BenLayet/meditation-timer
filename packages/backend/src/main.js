import { resolveDependencies } from "./config/resolveDependencies.js";
import { providers } from "./config/production.providers.js";
import { startHttpServer } from "./adapters/http-server.js";
// resolve dependencies
const resolved = await resolveDependencies(providers);
// start server
startHttpServer(resolved.serverConfig);
