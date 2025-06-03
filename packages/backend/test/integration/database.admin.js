import { dependencies } from "./global-setup.js";
const environment = dependencies.environment;
const datasource = dependencies.datasource;

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
