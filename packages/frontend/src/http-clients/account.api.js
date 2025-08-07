const API_URL = "/api/v1/accounts";

export class AccountApi {
  createAccount = async (account) => {
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }).then((response) => response.json());
  };
  login = async (credentials) => {
    return fetch(`${API_URL}/`, {
      method: "GET",
      queryParams: {
        login: credentials.login,
      },
    }).then((response) => response.json());
  };
}
