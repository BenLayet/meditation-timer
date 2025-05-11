const API_URL = "/api/v1/email-activations";
export class EmailActivationApi {
   requestEmailActivation = async (email) => {
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
}
