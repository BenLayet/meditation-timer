import fetch from "node-fetch";

const HTTP_CLIENT_TIMEOUT_IN_MS = 1000;

export const processResponse = async (response) => {
  const status = response.status;
  const body = await response.json();
  const headers = response.headers;
  return {status, body, headers};
};
export const httpPost = async (url, data, headers = {}) =>{
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(HTTP_CLIENT_TIMEOUT_IN_MS),
  }).then(processResponse);
  return response;
};

export const httpGet = async (url, headers = {}, queryParams = {}) => {
  // Build the query string from the queryParams object
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  // Perform the GET request
  const response = await fetch(fullUrl, {
    headers,
    signal: AbortSignal.timeout(HTTP_CLIENT_TIMEOUT_IN_MS),
  }).then(processResponse);
  return response;
};
