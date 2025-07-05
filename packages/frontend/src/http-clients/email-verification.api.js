import i18n from "../config/i18n.js";
import { validateLanguageCode } from "domain/src/models/language.validator.js";

const API_URL = "/api/v1/email-verifications";

export class EmailVerificationApi {
  sendVerificationLink = async (emailVerification) => {
    const languageCode = i18n.language;
    validateLanguageCode(languageCode);
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": languageCode,
      },
      body: JSON.stringify(emailVerification),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  };
  retrieveVerification = async (emailVerification) => {
    return fetch(`${API_URL}/${emailVerification.uuid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${emailVerification.retrieveToken}`,
      },
    }).then(async (response) => {
      //403 is expected when the email verification has expired
      if (!response.ok && response.status !== 403) {
        throw new Error(`HTTP error!HTTP status: ${response.status}`);
      }
      const { status, userToken } = await response.json();
      emailVerification.status = status;
      if (response.ok) {
        emailVerification.userToken = userToken;
      }
      return emailVerification;
    });
  };
}
