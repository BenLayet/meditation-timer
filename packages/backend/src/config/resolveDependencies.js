import { loadEnvironmentProperties } from "./environment.properties.js";

export async function resolveDependencies(providers) {
  let resolved = loadEnvironmentProperties();
  for (const key of Object.keys(providers)) {
    resolved[key] = await providers[key](resolved); // Resolve the current provider with the accumulated dependencies
  }
  return resolved;
}
