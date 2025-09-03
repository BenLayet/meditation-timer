import { fetchWithTimeout } from "./fetch-with-timeout.function.js";

const API_URL = "/api/v1/events";

export class EventApi {
  getEventPage = (userToken) => async (afterId, size) => {
    return fetchWithTimeout(`${API_URL}?afterId=${afterId}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };

  postEvent = (userToken) => async (event) => {
    return fetchWithTimeout(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(event),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
}
