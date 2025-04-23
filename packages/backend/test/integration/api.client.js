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
export const logEvent = async (event, userUuid) =>
  httpPost(eventsUrl, event, { Cookie: `userUuid=${userUuid}` });
export const getEventPage = async (userUuid, afterId, size) =>
  httpGet(eventsUrl, { Cookie: `userUuid=${userUuid}`}, {afterId, size} );

const healthUrl = `${apiBaseUrl}/health`;
export const checkApiHealth = async () => httpGet(healthUrl);
