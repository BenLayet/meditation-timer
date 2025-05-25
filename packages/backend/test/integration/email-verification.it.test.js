import { postEmailVerification, getEmailVerification } from "./api.client.js";
import {
  clearUserData,
  resetFakeUuidSequence,
  getLastMailSent,
} from "./database.admin.js";
import { fakeTokenService } from "../mock.providers.js";
import { httpGet } from "./http.client.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";

const emailVerificationUuid = "10000000-0000-1000-8000-000000000001";
const userToken = fakeTokenService.createPermanentToken({
  userUuid: "10000000-0000-1000-8000-000000000002",
});
const retrieveEmailVerificationToken = fakeTokenService.createShortLivedToken({
  emailVerificationUuid: "10000000-0000-1000-8000-000000000001",
  scope: ["RETRIEVE"],
});
const activateToken = fakeTokenService.createShortLivedToken({
  emailVerificationUuid: "10000000-0000-1000-8000-000000000001",
  scope: ["ACTIVATE"],
});
const verificationLink = `http://localhost:18000/api/v1/email-verifications/activate/${activateToken}`;

describe("activating emails", () => {
  const email = "email1@example.org";
  afterEach(clearUserData(email));
  beforeAll(resetFakeUuidSequence);

  test("posting an email verification should return a retrieveEmailVerificationToken", async () => {
    //WHEN
    const { body, status } = await postEmailVerification({ email });

    //THEN
    expect(status, "status should be 201").toBe(201);
    expect(body).toEqual({
      status: emailVerificationStatus.ACTIVATION_LINK_SENT,
      retrieveEmailVerificationToken,
    });
  });

  test("posting an email verification should send an email", async () => {
    //WHEN
    await postEmailVerification({ email });

    //THEN
    const lastMail = await getLastMailSent();
    expect(lastMail).toEqual({
      from: "mailfrom@test",
      to: email,
      subject: "Activate your account",
      html: expect.stringMatching(
        /Click to let Meditation Timer know that this is your email adress/,
      ),
    });
  });

  test("posting an email verification should send an verification link", async () => {
    //WHEN
    await postEmailVerification({ email });

    //THEN
    const { html } = await getLastMailSent();
    const link = extractFirstLink(html);
    expect(link).toBe(verificationLink);
  });

  test("should activate email when link is clicked once", async () => {
    //GIVEN
    await postEmailVerification({ email });
    //WHEN
    const { body, status } = await httpGet(verificationLink); // Fetch returns a Response object

    // THEN
    expect(status).toBe(200); // Check the status code
    expect(body).toEqual({ message: "email activated successfully" }); // Check the response body content
  });
  test("should return error when verification link is clicked twice", async () => {
    //GIVEN
    await postEmailVerification({ email });
    await httpGet(verificationLink); // Click once
    //WHEN
    const { body, status } = await httpGet(verificationLink); // Click again

    // THEN
    expect(status).toBe(403); // Check the status code
    expect(body).toEqual({ error: "Invalid or expired verification token" }); // Check the response body content
  });
  test("should return userToken when requested if email is verified", async () => {
    //GIVEN
    const {
      body: { retrieveEmailVerificationToken },
    } = await postEmailVerification({ email });
    await httpGet(verificationLink); // verify email
    //WHEN
    const { body, status } = await getEmailVerification(
      emailVerificationUuid,
      retrieveEmailVerificationToken,
    ); // Check the status of the email verification

    // THEN
    expect(status).toBe(200);
    expect(body).toEqual({
      status: emailVerificationStatus.VERIFIED,
      userToken,
    });
  });
});

function extractFirstLink(text) {
  const regex = /(https?:\/\/[\w\/:\-=]+)/;
  const match = text.match(regex);
  return match ? match[1] : null;
}
