const routeConstants = {
  api: "/api/v1",
  resources: {
    health: { base: "/health" },
    events: {
      base: "/events",
    },
    accounts: {
      base: "/accounts",
      endpoints: {
        createAccount: {
          path: "/",
        },
        login: {
          path: "/login",
        },
      },
    },
  },
};

export const routeProviders = {
  routeProperties: () => ({
    health: {
      base: `${routeConstants.api}${routeConstants.resources.health.base}`,
    },
    events: {
      base: `${routeConstants.api}${routeConstants.resources.events.base}`,
    },
    accounts: {
      base: `${routeConstants.api}${routeConstants.resources.accounts.base}`,
      createAccount: `${routeConstants.resources.accounts.endpoints.createAccount.path}`,
      login: `${routeConstants.resources.accounts.endpoints.login.path}`,
    },
  }),
};
