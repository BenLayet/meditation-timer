import { loadEnvironmentProperties } from "./environment.properties.js";
import { createDatasource } from "./datasource.js";
import { EventRepository } from "../repositories/event.repository.js";
import { MailgunEmailService } from "../adapters/email.service.js";
import { EmailActivationRepository } from "../repositories/email-activation.repository.js";
import { EmailActivationService } from "../services/email-activation.service.js";
import { JwtTokenService } from "../adapters/token.service.js";
import { UuidService } from "../adapters/uuid.service.js";
import { TransactionService } from "../repositories/transaction.service.js";
import { UserRepository } from "../repositories/user.repository.js";
import { serverConfig } from "./server.config.js";

export const providers = {
  environmentProperties: () => loadEnvironmentProperties(),
  datasource: ({ datasourceConfig }) => createDatasource(datasourceConfig),
  eventRepository: ({ datasource }) => new EventRepository(datasource),
  transactionService: ({ datasource }) => new TransactionService(datasource),
  emailActivationRepository: ({ datasource }) =>
    new EmailActivationRepository(datasource),
  userRepository: ({ datasource }) => new UserRepository(datasource),
  tokenService: ({ jwtSecret }) => new JwtTokenService(jwtSecret),
  emailService: () => new MailgunEmailService(),
  uuidService: () => new UuidService(),
  emailActivationUrl: ({ apiHost, apiPort, apiVersion }) =>
    `${apiHost}:${apiPort}/api/${apiVersion}/email-activations/`,
  emailActivationService: ({
    transactionService,
    emailActivationRepository,
    userRepository,
    emailActivationUrl,
    emailService,
    tokenService,
    uuidService,
  }) =>
    new EmailActivationService(
      transactionService,
      emailActivationRepository,
      userRepository,
      emailActivationUrl,
      emailService,
      tokenService,
      uuidService
    ),
    serverConfig
};
