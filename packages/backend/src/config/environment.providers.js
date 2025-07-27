import build from "../../../../build.json";
export const environmentProviders = {
  //Generic
  environment: () => process.env["NODE_ENV"],
  build: () => build,
};
