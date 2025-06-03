import { apiClient } from "./api.client.js";
import { clearUserData } from "./database.admin.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import { fakeEmailSender, fakeTokenService } from "./test-providers.js";

const emailVerificationUuid = "10000000-0000-1000-8000-000000000001";
const userToken = fakeTokenService.createPermanentToken({
  userUuid: "10000000-0000-1000-8000-000000000001",
});
const retrieveToken = fakeTokenService.createShortLivedToken({
  emailVerificationUuid: "10000000-0000-1000-8000-000000000001",
  scope: ["RETRIEVE"],
});
const verifyToken = fakeTokenService.createShortLivedToken({
  emailVerificationUuid: "10000000-0000-1000-8000-000000000001",
  scope: ["VERIFY"],
});
const verificationLink = `http://localhost:18000/api/v1/email-verifications/verify/${verifyToken}`;

describe("verifying emails", () => {
  const email = "email1@example.org";
  afterEach(clearUserData(email));

  test("posting an email verification should return a retrieveToken", async () => {
    //WHEN
    const { body, status } = await apiClient.sendVerificationLink(
      {},
      { email },
    );

    //THEN
    expect(status, "status should be 201").toBe(201);
    expect(body).toEqual({
      status: emailVerificationStatus.VERIFICATION_LINK_SENT,
      retrieveToken,
      email,
      uuid: emailVerificationUuid,
    });
  });

  test("posting an email verification should send an email", async () => {
    //WHEN
    await apiClient.sendVerificationLink({}, { email });

    //THEN
    expect(fakeEmailSender.lastMail).toEqual({
      from: "mailfrom@test",
      to: email,
      subject: "Verify your account",
      html: expect.stringMatching(
        /Click to confirm your email address to Meditation Timer: <a href='.*' target='_blank'>.*<\/a>/,
      ),
    });
  });

  test("posting an email verification should send a verification link", async () => {
    //WHEN
    await apiClient.sendVerificationLink({}, { email });

    //THEN
    const { html } = fakeEmailSender.lastMail;
    const link = extractFirstLink(html);
    expect(link).toBe(verificationLink);
  });

  test("should verify email when link is clicked once", async () => {
    //GIVEN
    await apiClient.sendVerificationLink({}, { email });
    //WHEN
    const { body, status } = await apiClient.verifyEmailAddress({
      verifyToken,
    });

    // THEN
    expect(status).toBe(200); // Check the status code
    expect(body).toEqual({ message: "email verified successfully" }); // Check the response body content
  });
  test("should return error when verification link is clicked twice", async () => {
    //GIVEN
    await apiClient.sendVerificationLink({}, { email });
    await apiClient.verifyEmailAddress({
      verifyToken,
    }); // click once

    //WHEN
    const { body, status } = await apiClient.verifyEmailAddress({
      verifyToken,
    }); // Click again

    // THEN
    expect(status).toBe(403); // Check the status code
    expect(body).toEqual({ error: "Invalid or expired verification token" }); // Check the response body content
  });
  test("should return userToken when requested if email is verified", async () => {
    //GIVEN
    await apiClient.sendVerificationLink({}, { email });
    await apiClient.verifyEmailAddress({
      verifyToken,
    });
    //WHEN
    const { body, status } = await apiClient.retrieveVerification(
      {
        emailVerificationUuid,
      },
      {},
      { authorization: `Bearer ${retrieveToken}` },
    );

    // THEN
    expect(status).toBe(200);
    expect(body).toEqual({
      status: emailVerificationStatus.VERIFIED,
      userToken,
      uuid: emailVerificationUuid,
    });
  });
});

function extractFirstLink(text) {
  const regex = /(https?:\/\/[\w\/:\-=]+)/;
  const match = text.match(regex);
  return match ? match[1] : null;
}
