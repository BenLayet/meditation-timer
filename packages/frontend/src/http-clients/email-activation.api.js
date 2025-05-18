const API_URL = "/api/v1/email-activations";
export class EmailActivationApi {
   requestEmailActivation = async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  createUser = async (createUserToken) => {
    if (!createUserToken) {
      throw new Error("Create user token is required");
    }
    return fetch(`${API_URL}/create-user`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${createUserToken}`,
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
}
