import { MailgunEmailSender } from "../adapters/email-sender.js";

export const emailSenderProviders = {
  //EMAIL SENDER
  mailGunApiKey: () => process.env["MAILGUN_API_KEY"],
  mailGunDomain: () => process.env["MAILGUN_DOMAIN"],
  mailGunUrl: () => process.env["MAILGUN_URL"],
  mailgunProperties: ({ mailGunApiKey, mailGunDomain, mailGunUrl }) => ({
    apiKey: mailGunApiKey,
    domain: mailGunDomain,
    url: mailGunUrl,
  }),
  emailSender: ({ mailgunProperties, logger }) =>
    mailgunProperties.apiKey === "mock"
      ? { sendEmail: console.log }
      : new MailgunEmailSender(mailgunProperties, logger),
};
