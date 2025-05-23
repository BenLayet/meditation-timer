import { validateNotEmptyString } from "domain/src/models/not-null.validator.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";

const API_URL = "/api/v1/email-verifications";

export class EmailVerificationApi {
  createEmailVerification = async (email) => {
    validateNotEmptyString({ email });
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
  retrieveEmailVerification = async (emailVerificationUuid, token) => {
    validateNotEmptyString({ emailVerificationUuid });
    validateNotEmptyString({ token });

    return fetch(`${API_URL}/${emailVerificationUuid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      if (response.status === 403) {
        const { status } = await response.json();
        if (status === emailVerificationStatus.EXPIRED) {
          throw new Error(`Email verification expired`, {
            cause: emailVerificationStatus.EXPIRED,
          });
        }
      }
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP error!HTTP status: ${response.status}`);
    });
  };
}
