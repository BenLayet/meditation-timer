import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export class MailgunEmailService {
  constructor({ mailGunApiKey }) {
    this.mailgun = new Mailgun(FormData);
    this.mg = this.mailgun.client({
      username: "api",
      key: mailGunApiKey,
    });
  }
  async sendEmail({ from, to, subject, body }) {
    const data = await this.mg.messages.create(from, {
      from,
      to,
      subject,
      body,
    });
    console.log(data);
  }
}
