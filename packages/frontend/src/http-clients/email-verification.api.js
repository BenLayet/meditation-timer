const API_URL = "/api/v1/email-verifications";
export class EmailVerificationApi {
  verifyEmail = async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  getEmailVerification = async (emailVerificationUuid, token) => {
    // validate not null or undefined (lib in common package)
    if (!token) throw new Error("token is required");

    return fetch(`${API_URL}/check-status`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
}
