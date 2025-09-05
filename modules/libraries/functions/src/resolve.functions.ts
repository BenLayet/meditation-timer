import {
  validateNotNull,
  validateObjectWithNoNullValue,
} from "./assert.functions.js";

export type Provider<T = any> = (resolved: Record<string, any>) => T | Promise<T>;
export type Providers = Record<string, Provider>;

export async function resolve<T extends Providers>(providers: T): Promise<{
  [K in keyof T]: T[K] extends Provider<infer R> ? R : any;
}> {
  const resolved: Record<string, any> = {};
  for (const key of Object.keys(providers)) {
    const value = await providers[key](resolved); // Resolve the current provider with the accumulated dependencies
    if (typeof value === "object") {
      validateObjectWithNoNullValue({ [key]: value }, { resolved });
    } else {
      validateNotNull({ [key]: value }, { resolved });
    }
    resolved[key] = value;
  }
  return resolved as any;
}
