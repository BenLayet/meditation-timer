import { loadEnvironmentProperties } from "../../src/config/environment.properties.js";
import { createDatasource } from "../../src/config/datasource.js";

// load environment properties
const { environment, datasourceConfig } = loadEnvironmentProperties();
const datasource = createDatasource(datasourceConfig);

//add a test table to let mock services communicate with tests
await datasource`DROP TABLE IF EXISTS test_communication;`.execute();
await datasource`CREATE TABLE test_communication (
                     key TEXT PRIMARY KEY,
                     value TEXT
                 );`.execute();
await datasource`DELETE FROM users;`.execute();
await datasource`DELETE FROM email_activations;`.execute();

export const clearUserData = (email) => async () => {
  if (environment !== "test") {
    throw new Error(
      `This file should only be run in test mode, environment=${environment}`
    );
  }
  await datasource`DELETE
                     FROM users
                     WHERE email = ${email};`;
  await datasource`DELETE
                     FROM email_activations
                     WHERE email = ${email};`;
};
