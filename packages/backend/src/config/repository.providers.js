import { EventRepository } from "../repositories/event.repository.js";
import { EmailVerificationRepository } from "../repositories/email-verification.repository.js";

export const repositoryProviders = {
  //REPOSITORIES
  eventRepository: ({ datasource, datasourceErrorCodes, logger }) =>
    new EventRepository(datasource, datasourceErrorCodes, logger),
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
