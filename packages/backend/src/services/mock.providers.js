const emailService = async (datasource, environment, logger) => {
  if (environment !== "test")
    throw new Error(`This file should only be run in test mode. environment=${environment}`);
  await datasource`DROP TABLE IF EXISTS fake_mails;`;
  await datasource`CREATE TABLE fake_mails(id SERIAL PRIMARY KEY, mail JSON);`;

  const sendEmail = async (mail) => {
    logger.info("Fake email sent", mail);
    await datasource`INSERT INTO fake_mails (mail)
                     VALUES (${mail});`;
  };

  return {
    sendEmail,
  };
};

const uuidGenerator = async (datasource, environment) => {
  if (environment !== "test")
    throw new Error("This file should only be run in test mode");
  await datasource`DROP SEQUENCE IF EXISTS fake_uuid;`;
  await datasource`CREATE SEQUENCE fake_uuid START 1;`;
  const createUuid = async () => {
    const rows = await datasource`SELECT nextval('fake_uuid') as counter;`;
    const { counter } = rows[0];
    return `10000000-0000-1000-8000-${counter.padStart(12, "0")}`;
  };
  return {
    createUuid,
  };
};

export const fakeTokenService = {
  createShortLivedToken: (payload) =>
    btoa(JSON.stringify({
      life: "short",
      payload,
    })),
  createPermanentToken: (payload) =>
    btoa(JSON.stringify({
      life: "long",
      payload,
    })),
  verify: (token) => {
    const decoded = atob(token);
    const { payload } = JSON.parse(decoded);
    return payload;
  },
};

export const mockProviders = {
  emailService: ({ datasource, environment }) =>
    emailService(datasource, environment),
  tokenService: () => fakeTokenService,
  uuidGenerator: ({ datasource, environment }) =>
    uuidGenerator(datasource, environment),
};
