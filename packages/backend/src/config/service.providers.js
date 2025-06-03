import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailSender } from "../adapters/email-sender.js";
import { EmailVerificationRepository } from "../repositories/email-verification.repository.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidGenerator } from "../adapters/uuid-generator.js";
import { logger } from "../adapters/logger.js";
import { MessageBuilder } from "../service/message-builder.service.js";

export const serviceProviders = {
  //Generic
  environment: () => process.env["NODE_ENV"],
  version: () => process.env["BUILD_VERSION"],

  //API
  apiProperties: () => ({
    host: process.env["API_HOST"],
    port: process.env["API_PORT"],
    protocol: process.env["API_PROTOCOL"],
    version: process.env["API_VERSION"],
    basePath: `/api/${process.env["API_VERSION"]}`,
  }),

  //logs
  logLevel: () => process.env["LOG_LEVEL"],
  logPretty: () => process.env["LOG_PRETTY"],
  logger: ({ logLevel, logPretty }) => logger(logLevel, logPretty),

  //UUID
  uuidGenerator: () => new UuidGenerator(),

  //TOKEN
  tokenService: ({ jwtSecret, logger }) =>
    new JwtTokenService(jwtSecret, logger),

  //EMAIL SENDER
  mailGunApiKey: () => process.env["MAILGUN_API_KEY"],
  mailGunDomain: () => process.env["MAILGUN_DOMAIN"],
  mailgunProperties: ({ mailGunApiKey, mailGunDomain }) => ({
    apiKey: mailGunApiKey,
    domain: mailGunDomain,
  }),
  emailSender: ({ mailgunProperties, logger }) =>
    mailgunProperties.apiKey === "mock"
      ? { sendEmail: console.log }
      : new MailgunEmailSender(mailgunProperties, logger),

  //MESSAGE BUILDER
  messageBuilder: () => new MessageBuilder(),
  mailFrom: () => process.env["MAIL_FROM"],

  //REPOSITORIES
  eventRepository: ({ datasource, logger }) =>
    new EventRepository(datasource, logger),
  emailVerificationRepository: ({
    datasource,
    transactionService,
    uuidGenerator,
    logger,
  }) =>
    new EmailVerificationRepository(
      datasource,
      transactionService,
      uuidGenerator,
      logger,
    ),
};
