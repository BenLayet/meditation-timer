import {loadEnvironmentProperties} from "../../src/config/environment.properties.js";
import {createDatasource} from "../../src/config/datasource.js";

// load environment properties
const {environment, datasourceConfig} = loadEnvironmentProperties();
const datasource = createDatasource(datasourceConfig);

export const clearUserData = (userUuid) => async () => {
    if (environment !== "test") {
        throw new Error(`This file should only be run in test mode, environment=${environment}`);
    }
    await datasource`DELETE
                     FROM users
                     WHERE uuid = ${userUuid};`;
};
