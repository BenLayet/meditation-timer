// resolve dependencies
import { resolveDependencies } from "domain/src/lib/config/resolveDependencies.js";
import { testProviders } from "./test-providers.js";

export const dependencies = await resolveDependencies(testProviders);
