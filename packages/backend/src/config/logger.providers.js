import { logger } from "../adapters/logger.js";

export const loggerProviders = {
  //logs
  logLevel: () => process.env["LOG_LEVEL"],
  logPretty: () => process.env["LOG_PRETTY"],
  logger: ({ logLevel, logPretty }) => logger(logLevel, logPretty),
};
