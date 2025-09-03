import { testProviders } from "./test-providers.js";
import { resolve } from "@softer-software/functions/resolve.functions.js";

export const dependencies = await resolve(testProviders);
