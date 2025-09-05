import { testProviders } from "./test-providers.js";
import { resolve } from "@softersoftware/functions/resolve.functions.js";

export const dependencies = await resolve(testProviders);
