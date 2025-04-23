const EVENT_API_URL = "/api/v1/events";
export class EventApi {
  constructor(userUuidCookie) {
    this.userUuidCookie = userUuidCookie;
  }

  getEventPage = async (afterId, size) => {
    this.userUuidCookie.ensureCookieIsSet();
    return fetch(`${EVENT_API_URL}?afterId=${afterId}&size=${size}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }
    );
  };
  postEvent = async (event) => {
    this.userUuidCookie.ensureCookieIsSet();
    return fetch(EVENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
