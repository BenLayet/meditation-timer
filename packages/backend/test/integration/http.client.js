import fetch from "node-fetch";

const HTTP_CLIENT_TIMEOUT_IN_MS = 1000;

export const processResponse = async (response) => {
  const status = response.status;
  const body = await response.json();
  return { status, body };
};
export const httpPost = async (url, data, headers = {}) =>{
  console.log(`POST ${url} requested`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(HTTP_CLIENT_TIMEOUT_IN_MS),
  }).then(processResponse);
  console.log(`POST ${url} completed. status=${response.status}`);
  return response;
};

export const httpGet = async (url, headers = {}, queryParams = {}) => {
  // Build the query string from the queryParams object
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  console.log(`GET ${fullUrl} requested`);
  // Perform the GET request
  const response = await fetch(fullUrl, {
    headers,
    signal: AbortSignal.timeout(HTTP_CLIENT_TIMEOUT_IN_MS),
  }).then(processResponse);

  console.log(`GET ${fullUrl} completed. status=${response.status}`);
  return response;
};
