import { loadEnvironmentProperties } from "./config/environment.properties.js";
import { appDependencies } from "./app.dependencies.js";
import { startApp } from "./startApp.js";

// resolve dependencies
const environmentProperties = loadEnvironmentProperties();
const dependencies = appDependencies(environmentProperties);

// start server
startApp(dependencies);
