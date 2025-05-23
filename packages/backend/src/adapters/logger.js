import pino from "pino";

export const logger = (logLevel, environment) =>
  pino({
    level: logLevel,
    transport: ["dev", "test"].includes(environment)
      ? { target: "pino-pretty" }
      : undefined,
  });
