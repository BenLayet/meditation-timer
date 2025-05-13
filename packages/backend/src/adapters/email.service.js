import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export class MailgunEmailService {
  constructor() {
    this.mailgun = new Mailgun(FormData);
    this.mg = this.mailgun.client({
      username: "api",
      key: process.env.MAIL_GUN_API_KEY || "MAIL_GUN_API_KEY",
    });
  }
  async sendEmail({to, subject, text}) {
    try {
      const data = await this.mg.messages.create("sandbox461fd511aabe4405be31c6666625f6e1.mailgun.org", {
        from: "Mailgun Sandbox <postmaster@sandbox461fd511aabe4405be31c6666625f6e1.mailgun.org>",
        to,
        subject,
        text
      });

      console.log(data); // logs response data
    } catch (error) {
      console.log(error); //logs any error
    }
  }
}