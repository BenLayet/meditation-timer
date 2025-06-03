import { MailgunEmailSender } from "../adapters/email-sender.js";

export const emailSenderProviders = {
  //EMAIL SENDER
  mailGunApiKey: () => process.env["MAILGUN_API_KEY"],
  mailGunDomain: () => process.env["MAILGUN_DOMAIN"],
  mailgunProperties: ({ mailGunApiKey, mailGunDomain }) => ({
    apiKey: mailGunApiKey,
    domain: mailGunDomain,
  }),
  emailSender: ({ mailgunProperties, logger }) =>
    mailgunProperties.apiKey === "mock"
      ? { sendEmail: console.log }
      : new MailgunEmailSender(mailgunProperties, logger),
};
