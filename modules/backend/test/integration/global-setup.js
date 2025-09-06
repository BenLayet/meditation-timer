import { testProviders } from "./test-providers.js";
import { resolve } from "@softersoftware/functions/resolve.functions";

export const dependencies = await resolve(testProviders);
