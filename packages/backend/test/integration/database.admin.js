import { loadEnvironmentProperties } from "../../src/config/environment.properties.js";
import { createDatasource } from "../../src/adapters/datasource.js";

// load environment properties
const { environment, datasourceProperties } = loadEnvironmentProperties();
const datasource = createDatasource(datasourceProperties);

export const resetFakeUuidSequence = async () => {
  await datasource`SELECT setval('fake_uuid', 1, false) as counter;`;
};

export const clearUserData = (email) => async () => {
  if (environment !== "test") {
    throw new Error(
      `This file should only be run in test mode, environment=${environment}`,
    );
  }
  await datasource`DELETE
                     FROM users
                     WHERE email = ${email};`;
  await datasource`DELETE
                     FROM email_verifications
                     WHERE email = ${email};`;
};

export const getLastMailSent = async () => {
  const rows =
    await datasource`SELECT mail FROM fake_mails ORDER BY id DESC LIMIT 1;`;
  return rows[0]?.mail;
};
