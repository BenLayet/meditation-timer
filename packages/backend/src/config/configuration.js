import { createDatasource } from "./datasource.js";
import { DeviceRepository } from "../repositories/device.repository.js";
import { EventRepository } from "../repositories/event.repository.js";
import { devicesRouter } from "../routes/devices.router.js";
import { eventsRouter } from "../routes/events.router.js";
import { healthRouter } from "../routes/health.router.js";

export function appDependencies( environmentProperties) {
    const datasource = createDatasource(environmentProperties.datasourceConfig);
    const deviceRepository = new DeviceRepository(datasource);
    const eventRepository = new EventRepository(datasource);
    const routes = {
      devices: devicesRouter(deviceRepository),
      events: eventsRouter(eventRepository),
      health: healthRouter(environmentProperties),
    };
    const { apiPort } = environmentProperties;
    return ({ apiPort, routes, datasource });
}