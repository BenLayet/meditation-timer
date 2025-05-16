import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export class MailgunEmailSender {
  constructor({ mailGunApiKey, logger }) {
    this.mailgun = new Mailgun(FormData);
    this.mg = this.mailgun.client({
      username: "api",
      key: mailGunApiKey,
    });
    this.logger = logger;
  }
  async sendEmail({ from, to, subject, body }) {
    this.logger.debug("Sending email", { from, to, subject });
    const data = await this.mg.messages.create(from, {
      from,
      to,
      subject,
      body,
    });
  }
}
