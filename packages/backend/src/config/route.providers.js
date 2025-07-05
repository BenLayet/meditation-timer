const routeConstants = {
  api: "/api/v1",
  resources: {
    health: { base: "/health" },
    emailVerifications: {
      base: "/email-verifications",
      endpoints: {
        verify: {
          path: "/verify",
          pathParams: {
            verifyToken: "verifyToken",
          },
          queryParams: {
            languageCode: "languageCode",
          },
        },
        retrieve: {
          pathParams: { emailVerificationUuid: "emailVerificationUuid" },
        },
      },
    },
    events: {
      base: "/events",
    },
  },
};

export const routeProviders = {
  routeProperties: () => ({
    healthPath: `${routeConstants.api}${routeConstants.resources.health.base}`,
    emailVerificationsPath: `${routeConstants.api}${routeConstants.resources.emailVerifications.base}`,
    emailVerifications: {
      verifyEmailAddressPath: `${routeConstants.resources.emailVerifications.endpoints.verify.path}/:${routeConstants.resources.emailVerifications.endpoints.verify.pathParams.verifyToken}`,
      retrieveVerificationPath: `/:${routeConstants.resources.emailVerifications.endpoints.retrieve.pathParams.emailVerificationUuid}`,
    },
    eventsPath: `${routeConstants.api}${routeConstants.resources.events.base}`,
  }),
  paramProperties: () => ({
    emailVerifications: {
      verifyToken:
        routeConstants.resources.emailVerifications.endpoints.verify.pathParams
          .verifyToken,
      languageCode:
        routeConstants.resources.emailVerifications.endpoints.verify.queryParams
          .languageCode,
      emailVerificationUuid:
        routeConstants.resources.emailVerifications.endpoints.retrieve
          .pathParams.emailVerificationUuid,
    },
  }),
  publicUrlBuilders: ({ publicUrl }) => ({
    verifyEmailAddress: ({ verifyToken, languageCode }) =>
      `${publicUrl}${routeConstants.api}${routeConstants.resources.emailVerifications.base}` +
      `${routeConstants.resources.emailVerifications.endpoints.verify.path}/${verifyToken}` +
      `?${routeConstants.resources.emailVerifications.endpoints.verify.queryParams.languageCode}=${languageCode}`,
  }),
};
