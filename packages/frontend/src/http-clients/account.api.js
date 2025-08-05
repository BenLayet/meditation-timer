import i18n from "../config/i18n.js";
import { validateLanguageCode } from "domain/src/models/language.validator.js";

const API_URL = "/api/v1/accounts";

export class AccountApi {
  createAccount = async (account) => {
    const languageCode = i18n.language;
    validateLanguageCode(languageCode);
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": languageCode,
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
