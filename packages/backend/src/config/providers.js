import { createDatasource } from "../adapters/datasource.js";
import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailService } from "../adapters/email.service.js";
import { EmailActivationRepository } from "../repositories/email-activation.repository.js";
import { EmailActivationService } from "../services/email-activation.service.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidService } from "../adapters/uuid.service.js";
import { TransactionService } from "../repositories/transaction.service.js";
import { UserRepository } from "../repositories/user.repository.js";

export const providers = {
  datasource: ({ datasourceProperties }) =>
    createDatasource(datasourceProperties),
  eventRepository: ({ datasource }) => new EventRepository(datasource),
  transactionService: ({ datasource }) => new TransactionService(datasource),
  emailActivationRepository: ({ datasource }) =>
    new EmailActivationRepository(datasource),
  userRepository: ({ datasource }) => new UserRepository(datasource),
  tokenService: ({ jwtSecret }) => new JwtTokenService(jwtSecret),
  emailService: ({ mailProperties }) => new MailgunEmailService(mailProperties),
  uuidService: () => new UuidService(),
  emailActivationService: ({
    transactionService,
    emailActivationRepository,
    userRepository,
    emailService,
    tokenService,
    uuidService,
    mailFrom,
    apiProperties,
  }) =>
    new EmailActivationService(
      transactionService,
      emailActivationRepository,
      userRepository,
      emailService,
      tokenService,
      uuidService,
      mailFrom,
      apiProperties
    ),
  cleanupTasks: ({ datasource }) => [datasource.end],
};
