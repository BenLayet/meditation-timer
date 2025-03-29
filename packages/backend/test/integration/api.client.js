import {httpGet, httpPost} from "./http.client.js";
import {loadEnvironmentProperties} from "../../src/config/environment.properties.js";
// load environment properties
export const {environment, apiHost, apiPort} = loadEnvironmentProperties();

// check if the environment is test
if (environment !== "test") {
  throw new Error("This file should only be run in test mode");
}

const apiBaseUrl = `http:/${apiHost}:${apiPort}/api/v1`;

const eventsUrl = `${apiBaseUrl}/events`;
export const postEvent = async (event, userUuid) =>
  httpPost(eventsUrl, event, { Cookie: `userUuid=${userUuid}` });
export const getEventPage = async (event, userUuid) =>
  httpGet(eventsUrl, event, { Cookie: `userUuid=${userUuid}` });

const devicesUrl = `${apiBaseUrl}/devices`;
export const registerDevice = async (device, userUuid) =>
  httpPost(devicesUrl, device, { Cookie: `userUuid=${userUuid}` });
export const getDevices = async (userUuid) =>
  httpGet(devicesUrl, { Cookie: `userUuid=${userUuid}` });

const healthUrl = `${apiBaseUrl}/health`;
export const checkApiHealth = async () => httpGet(healthUrl);
