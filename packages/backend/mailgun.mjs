import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

async function sendSimpleMessage(mail) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY ,
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });
  try {
    const data = await mg.messages.create("sandbox461fd511aabe4405be31c6666625f6e1.mailgun.org", mail);

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
sendSimpleMessage({
      from: "Mailgun Sandbox <postmaster@sandbox461fd511aabe4405be31c6666625f6e1.mailgun.org>",
      to: ["Benjamin Layet <layetbenjamin@gmail.com>"],
      subject: "Hello Benjamin Layet",
      text: "Congratulations Benjamin Layet, you just sent an email with Mailgun! You are truly awesome!",
    });