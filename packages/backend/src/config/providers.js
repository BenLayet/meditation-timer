import { createDatasource } from "../adapters/datasource.js";
import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailSender } from "../adapters/email-sender.js";
import { EmailVerificationRepository } from "../repositories/email-verification.repository.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidGenerator } from "../adapters/uuid-generator.js";
import { TransactionService } from "../repositories/transaction.service.js";
import { logger } from "../adapters/logger.js";
import { MessageBuilder } from "../service/message-builder.service.js";
import { retrieveVerification } from "../usecase/email-verification/retrieve-verification.usecase.js";
import { sendVerificationLink } from "../usecase/email-verification/send-verification-link.usecase.js";
import { verifyEmailAddress } from "../usecase/email-verification/verify-email-address.usecase.js";

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
  emailSender: ({ mailgunProperties, logger }) =>
    mailgunProperties.apiKey === "mock"
      ? { sendEmail: console.log }
      : new MailgunEmailSender(mailgunProperties, logger),
  messageBuilder: () => new MessageBuilder(),
  cleanupTasks: ({ datasource }) => [datasource.end],
  sendVerificationLink: sendVerificationLink,
  retrieveVerification: retrieveVerification,
  verifyEmailAddress: verifyEmailAddress,
};
