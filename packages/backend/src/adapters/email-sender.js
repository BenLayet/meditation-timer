import FormData from "form-data";
import Mailgun from "mailgun.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "../validators/not-null.validator.js";

export class MailgunEmailSender {
  constructor({ apiKey, domain }, logger) {
    validateNotNullObject({ logger });
    validateNotEmptyString({ domain });
    validateNotEmptyString({ apiKey });
    this.logger = logger;
    this.apiKey = apiKey;
    this.domain = domain;
    this.logger.debug("MailgunEmailSender initialized");
  }
  async sendEmail(mail) {
    this.logger.debug(mail, "Sending email");
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: this.apiKey,
    });
    try {
      const data = await mg.messages.create(this.domain, mail);
      this.logger.debug(data, "mail queued successfully with mailgun"); // logs response data
    } catch (error) {
      this.logger.error(error, "mail not queued with mailgun"); //logs any error
      throw error;
    }
  }
}
