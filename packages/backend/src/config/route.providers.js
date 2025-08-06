const routeConstants = {
  api: "/api/v1",
  resources: {
    health: { base: "/health" },
    events: {
      base: "/events",
    },
  },
};

export const routeProviders = {
  routeProperties: () => ({
    healthPath: `${routeConstants.api}${routeConstants.resources.health.base}`,
    eventsPath: `${routeConstants.api}${routeConstants.resources.events.base}`,
  }),
};
