import { dependencies } from "./global-setup.js";

const environment = dependencies.environment;
const datasource = dependencies.datasource;

export const clearUserData = (login) => async () => {
  if (environment !== "test") {
    throw new Error(
      `This file should only be run in test mode, environment=${environment}`,
    );
  }
  await datasource`DELETE
                   FROM users
                   WHERE login = ${login};`;
};
export const createUser = (userUuid, login) => async () => {
  if (environment !== "test") {
    throw new Error(
      `This file should only be run in test mode, environment=${environment}`,
    );
  }
  await datasource`INSERT INTO users (uuid, login, password_hash) VALUES (${userUuid}, ${login}, '$HASH');`;
};
