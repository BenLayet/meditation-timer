import { loadEnvironmentProperties } from "../src/config/environment.properties.js";
import { appDependencies } from "../src/app.dependencies.js";
import { startApp } from "../src/startApp.js";
import { mockProviders } from "./mocks.js";
// load environment properties
const environmentProperties = loadEnvironmentProperties();

// check if the environment is test
if (environmentProperties.environment !== "test") {
  throw new Error("This file should only be run in test mode");
}
startApp(appDependencies(environmentProperties, mockProviders));
