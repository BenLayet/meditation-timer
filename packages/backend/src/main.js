import { loadEnvironmentProperties } from "./config/environment.properties.js";
import { appDependencies } from "./config/configuration.js";
import { startApp } from "./app.js";

// resolve dependencies
const environmentProperties = loadEnvironmentProperties();
const dependencies = appDependencies(environmentProperties);

// start server
startApp(dependencies);
