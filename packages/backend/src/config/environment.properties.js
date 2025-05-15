import dotenv from "dotenv";
import path from "path";

export const loadEnvironmentProperties = () => {
  // Determine the environment and load the corresponding .env file
  const envFile = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`;

  dotenv.config({ path: path.resolve(process.cwd(), envFile) });
  // Override console.debug to respect the DEBUG environment variable
  if (!process.env.DEBUG) {
    console.debug = () => {}; // No-op if DEBUG is not set
  }
  console.debug(`Environment loaded from ${envFile}`);

  const version = process.env.BUILD_VERSION ?? "unknown";
  const environment = process.env.NODE_ENV ?? "unknown";
  const jwtSecret = process.env.JWT_SECRET ?? "JWT_SECRET";
  const mailFrom = process.env.MAIL_FROM ?? "no-reply@localhost";

  //api properties
  const apiHost = process.env.API_HOST ?? "localhost";
  const apiPort = process.env.API_PORT ?? 8000;
  const apiProtocol = process.env.API_PROTOCOL ?? "http";
  const apiVersion = process.env.API_VERSION ?? "v1";
  const apiProperties = {
    host: apiHost,
    port: apiPort,
    protocol: apiProtocol,
    version: apiVersion,
    basePath: `/api/${apiVersion}`,
  };
  // mail server properties
  const mailProperties = {
    mailgunApiKey: process.env.MAILGUN_API_KEY ?? "MAILGUN_API_KEY",
  };
  // datasource properties
  const datasourceProperties = {
    host: process.env.DATABASE_HOST,
    port: process.env.POSTGRES_PORT ?? 5432,
    ssl: process.env.POSTGRES_SSL_MODE,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };
  return {
    version,
    environment,
    jwtSecret,
    mailFrom,
    apiProperties,
    mailProperties,
    datasourceProperties,
  };
};
