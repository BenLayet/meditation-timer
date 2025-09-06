import { resolve } from "@softersoftware/functions/resolve.functions";
import { providers } from "./config/providers.js";
import { startHttpServer } from "./adapters/http-server.js";
// resolveFunctions dependencies
const dependencies = await resolve(providers);
// start server
await startHttpServer(dependencies);
