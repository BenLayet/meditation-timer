import {loadEnvironmentProperties} from "../../src/config/environment.properties.js";
import {appDependencies} from "../../src/config/configuration.js";
import {startApp} from "../../src/app.js";

export default async () => {
    console.log("Running global setup...");

    // load environment properties
    const environmentProperties = loadEnvironmentProperties();

    // check if the environment is test
    if (environmentProperties.environment !== "test") {
        throw new Error("This file should only be run in test mode");
    }
    const server = await startApp(appDependencies(environmentProperties));

    // Return a teardown function (optional, for cleaning up resources)
    return async () => {
        console.log("Running global teardown...");
        await server.close();
        console.log("HTTP server stopped");
    };
};
