const API_URL = "/api/v1/accounts";
export class AccountApi {
  getAccount = async () => {
    return fetch(`${API_URL}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }
    );
  };
}
