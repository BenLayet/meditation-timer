export const environmentProviders = {
  //Generic
  environment: () => process.env["NODE_ENV"],
  version: () => process.env["BUILD_VERSION"],
};
