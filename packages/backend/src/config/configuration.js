import { createDatasource } from "./datasource.js";
import { EventRepository } from "../repositories/event.repository.js";
import { eventsRouter } from "../routes/events.router.js";
import { healthRouter } from "../routes/health.router.js";

export function appDependencies( environmentProperties) {
    const datasource = createDatasource(environmentProperties.datasourceConfig);
    const eventRepository = new EventRepository(datasource);
    const routes = {
      events: eventsRouter(eventRepository),
      health: healthRouter(environmentProperties),
    };
    const { apiPort } = environmentProperties;
    return ({ apiPort, routes, datasource });
}