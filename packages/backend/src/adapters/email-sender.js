import FormData from "form-data";
import Mailgun from "mailgun.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";

export class MailgunEmailSender {
  constructor({ apiKey, domain, url }, logger) {
    validateNotNullObject({ logger });
    validateNotEmptyString({ domain });
    validateNotEmptyString({ apiKey });
    validateNotEmptyString({ url });
    this.logger = logger;
    this.apiKey = apiKey;
    this.domain = domain;
    this.url = url;
  }
  async sendEmail(mail) {
    this.logger.debug(mail, "Sending email");
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: this.apiKey,
      url: this.url,
    });
    try {
      const result = await mg.messages.create(this.domain, mail);
      this.logger.debug(result, "mail queued successfully with mailgun"); // logs response result
    } catch (error) {
      this.logger.error(error, "mail not queued with mailgun"); //logs any error
      throw error;
    }
  }
}
