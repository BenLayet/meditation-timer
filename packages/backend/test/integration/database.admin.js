import { loadEnvironmentProperties } from "../../src/config/environment.properties.js";
import { createDatasource } from "../../src/config/datasource.js";

// load environment properties
const { environment, datasourceConfig } = loadEnvironmentProperties();
const datasource = createDatasource(datasourceConfig);

//add a test table to let mock services communicate with tests
const setupQueries = [
  datasource`DROP TABLE IF EXISTS fake_emails;`,
  datasource`CREATE TABLE fake_emails (
                     id SERIAL PRIMARY KEY,
                     subject TEXT,
                     body TEXT,
                     recipient TEXT,
                     sender TEXT,
                     sent_at TIMESTAMP DEFAULT NOW()
                 );`,
  datasource`DROP SEQUENCE IF EXISTS fake_uuid;`,
  datasource`CREATE SEQUENCE fake_uuid START 1;`,
  datasource`DELETE FROM users;`,
  datasource`DELETE FROM email_activations;`,
];

console.log("Setting up test database...");
for (const query of setupQueries) {
  try {
    await query;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
console.log("Test database setup complete.");

export const resetFakeUuidSequence = async () => {
  await datasource`SELECT setval('fake_uuid', 1, false) as counter;`;
};

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
