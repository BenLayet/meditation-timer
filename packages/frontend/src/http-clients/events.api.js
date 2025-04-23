const EVENT_API_URL = "/api/v1/events";
export class EventApi {
  async getEventPage(fromId) {
    return fetch(`${EVENT_API_URL}?fromId=${fromId}`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }
  async postEvents(events) {
    return fetch(EVENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }
}
