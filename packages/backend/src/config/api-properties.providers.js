export const apiPropertiesProviders = {
  //API
  apiProperties: () => ({
    host: process.env["API_HOST"],
    port: process.env["API_PORT"],
    protocol: process.env["API_PROTOCOL"],
    version: process.env["API_VERSION"],
    basePath: `/api/${process.env["API_VERSION"]}`,
  }),
};
