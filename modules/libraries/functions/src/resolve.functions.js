import {
  validateNotNull,
  validateObjectWithNoNullValue,
} from "./assert.functions.js";

export async function resolve(providers) {
  const resolved = {};
  for (const key of Object.keys(providers)) {
    const value = await providers[key](resolved); // Resolve the current provider with the accumulated dependencies
    if (typeof value === "object") {
      validateObjectWithNoNullValue({ [key]: value }, { resolved });
    } else {
      validateNotNull({ [key]: value }, { resolved });
    }
    resolved[key] = value;
  }
  return resolved;
}
