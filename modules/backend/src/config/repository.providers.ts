import { EventRepository } from "../repositories/event.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

export const repositoryProviders = {
  eventRepository: ({ datasource, datasourceErrorCodes, logger }) =>
    new EventRepository(datasource, datasourceErrorCodes, logger),
  userRepository: ({ datasource, datasourceErrorCodes, uuidGenerator }) =>
    new UserRepository(datasource, datasourceErrorCodes, uuidGenerator),
};
