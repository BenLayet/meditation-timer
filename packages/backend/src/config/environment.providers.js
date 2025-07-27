import build from "../../../../build.json" with { type: "json" };
export const environmentProviders = {
  environment: () => process.env["NODE_ENV"],
  build: () => build,
};
