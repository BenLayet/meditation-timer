import { UuidGenerator } from "../adapters/uuid-generator.js";

export const uuidGeneratorProviders = {
  //UUID
  uuidGenerator: () => new UuidGenerator(),
};
