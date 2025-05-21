import { createDatasource } from "../adapters/datasource.js";
import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailSender } from "../adapters/email-sender.js";
import { EmailVerificationRepository } from "../repositories/email-verification.repository.js";
import { EmailVerificationService } from "../services/email-verification.service.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidGenerator } from "../adapters/uuid-generator.js";
import { TransactionService } from "../repositories/transaction.service.js";
import { logger } from "../adapters/logger.js";

export const providers = {
  logger: ({ logLevel, environment }) => logger(logLevel, environment),
  datasource: ({ datasourceProperties }) =>
    createDatasource(datasourceProperties),
  eventRepository: ({ datasource, logger }) =>
    new EventRepository(datasource, logger),
  uuidGenerator: () => new UuidGenerator(),
  transactionService: ({ datasource }) => new TransactionService(datasource),
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
  tokenService: ({ jwtSecret, logger }) =>
    new JwtTokenService(jwtSecret, logger),
  emailService: ({ mailgunProperties, logger }) =>
    mailgunProperties.apiKey === "mock"
      ? { sendEmail: console.log }
      : new MailgunEmailSender(mailgunProperties, logger),
  emailVerificationService: ({
    emailVerificationRepository,
    emailService,
    tokenService,
    mailFrom,
    apiProperties,
    logger,
  }) =>
    new EmailVerificationService(
      emailVerificationRepository,
      emailService,
      tokenService,
      mailFrom,
      apiProperties,
      logger,
    ),
  cleanupTasks: ({ datasource }) => [datasource.end],
};
