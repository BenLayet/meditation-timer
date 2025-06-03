import pino from "pino";

export const logger = (logLevel, logPretty) =>
  pino({
    level: logLevel,
    transport: logPretty ? { target: "pino-pretty" } : undefined,
  });
