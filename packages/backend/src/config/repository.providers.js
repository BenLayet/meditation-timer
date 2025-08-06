import { EventRepository } from "../repositories/event.repository.js";

export const repositoryProviders = {
  //REPOSITORIES
  eventRepository: ({ datasource, datasourceErrorCodes, logger }) =>
    new EventRepository(datasource, datasourceErrorCodes, logger),
};
