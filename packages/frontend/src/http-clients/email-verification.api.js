import {validateNotEmptyString} from "domain/src/models/not-null.validator.js";

const API_URL = "/api/v1/email-verifications";
export class EmailVerificationApi {
  createEmailVerification = async (email) => {
    validateNotEmptyString({email});
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
    validateNotEmptyString({emailVerificationUuid});
    validateNotEmptyString({token});

    return fetch(`${API_URL}/${emailVerificationUuid}`, {
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
