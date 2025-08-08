import { fetchWithTimeout } from "./fetch-with-timeout.function.js";

const API_URL = "/api/v1/accounts";

export class AccountApi {
  createAccount = async (account) => {
    return fetchWithTimeout(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }).then((response) => response.json());
  };
  login = async (credentials) => {
    return fetchWithTimeout(`${API_URL}/?login=${credentials.login}`, {
      method: "GET",
    }).then((response) => response.json());
  };
}
