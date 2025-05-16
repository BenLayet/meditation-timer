import { createDatasource } from "../adapters/datasource.js";
import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailSender } from "../adapters/email-sender.js";
import { EmailActivationRepository } from "../repositories/email-activation.repository.js";
import { EmailActivationService } from "../services/email-activation.service.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidGenerator } from "../adapters/uuid-generator.js";
import { TransactionService } from "../repositories/transaction.service.js";
import {logger} from "../adapters/logger.js";

export const providers = {
  logger: ({logLevel, environment}) => logger(logLevel, environment),
  datasource: ({ datasourceProperties }) =>
    createDatasource(datasourceProperties),
  eventRepository: ({ datasource, logger }) => new EventRepository(datasource, logger),
  uuidGenerator: () => new UuidGenerator(),
  transactionService: ({ datasource }) => new TransactionService(datasource),
  emailActivationRepository: ({ datasource, transactionService, uuidGenerator, logger }) =>
    new EmailActivationRepository(datasource, transactionService, uuidGenerator, logger),
  tokenService: ({ jwtSecret, logger }) => new JwtTokenService(jwtSecret, logger),
  emailService: ({ mailProperties, logger }) => new MailgunEmailSender(mailProperties, logger),
  emailActivationService: ({
    emailActivationRepository,
    emailService,
    tokenService,
    mailFrom,
    apiProperties,
    logger
  }) =>
    new EmailActivationService(
      emailActivationRepository,
      emailService,
      tokenService,
      mailFrom,
      apiProperties,
      logger
    ),
  cleanupTasks: ({ datasource }) => [datasource.end],
};
