import { httpGet, httpPost } from "./http.client.js";
import { loadEnvironmentProperties } from "../../src/config/environment.properties.js";
// load environment properties
export const { environment, apiProperties } = loadEnvironmentProperties();

// check if the environment is test
if (environment !== "test") {
  throw new Error("This file should only be run in test mode");
}

const { protocol, host, port, basePath } = apiProperties;

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

//EMAIL VERIFICATIONS
const emailVerificationsUrl = `${apiBaseUrl}/email-verifications`;
export const postEmailVerification = async (emailVerification) =>
  httpPost(emailVerificationsUrl, emailVerification);
export const activateEmail = async (token) =>
  httpPost(`${emailVerificationsUrl}/activate?token=${token}`);
export const getEmailVerification = async (emailVerificationUuid, token) =>
  httpGet(`${emailVerificationsUrl}/${emailVerificationUuid}`, {
    Authorization: `Bearer ${token}`,
  });
