import { httpGet, httpPost } from "./http.client.js";
import { loadEnvironmentProperties } from "../../src/config/environment.properties.js";
// load environment properties
export const { environment, apiProperties } = loadEnvironmentProperties();

// check if the environment is test
if (environment !== "test") {
  throw new Error("This file should only be run in test mode");
}

const {protocol, host, port, basePath} = apiProperties;

const apiBaseUrl = `${protocol}://${host}:${port}${basePath}`;

//HEALTH CHECK
const healthUrl = `${apiBaseUrl}/health`;
export const checkApiHealth = async () => httpGet(healthUrl);

//EVENTS
const eventsUrl = `${apiBaseUrl}/events`;
export const logEvent = async (event, userToken) =>
  httpPost(eventsUrl, event, { Cookie: `userToken=${userToken}` });
export const getEventPage = async (userToken, afterId, size) =>
  httpGet(eventsUrl, { Cookie: `userToken=${userToken}` }, { afterId, size });

//EMAIL ACTIVATIONS
const emailActivationsUrl = `${apiBaseUrl}/email-activations`;
export const postEmailActivation = async (emailActivation) =>
  httpPost(emailActivationsUrl, emailActivation);
export const activateEmail = async (activateToken) =>
  httpPost(`${emailActivationsUrl}/activate?token=${activateToken}`);
export const createUser = async (createUserToken) =>
  httpPost(`${emailActivationsUrl}/createUser`,{
    Authorization: `Bearer ${createUserToken}`,
  });
