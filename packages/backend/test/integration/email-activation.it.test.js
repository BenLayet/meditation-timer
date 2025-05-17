import { postEmailActivation, createUser } from "./api.client.js";
import {
  clearUserData,
  resetFakeUuidSequence,
  getLastMailSent,
} from "./database.admin.js";
import { fakeTokenService } from "../mock.providers.js";
import { httpGet } from "./http.client.js";

describe("activating emails", () => {
  const email = "email@example.org";
  afterEach(clearUserData(email));
  beforeEach(resetFakeUuidSequence);

  test("posting an email activation should return a createUserToken", async () => {
    //WHEN
    const { body, status } = await postEmailActivation({ email });

    //THEN
    expect(status, "status should be 201").toBe(201); 
    expect(body, "body should contain createUserToken").toEqual({ createUserToken: expect.any(String) });
    console.log("body", body);
    console.log("body.createUserToken", body.createUserToken);
    const b= atob(body.createUserToken);
    console.log("body.createUserToken decoded b", b);
    console.log("body.createUserToken decoded parsed", JSON.parse(b));
    const { uuid, scope } = fakeTokenService.verify(body.createUserToken);
    expect(scope, "scope should contain CREATE_USER").toContain("CREATE_USER");
    expect(uuid, "uuid should be the first one").toBe("10000000-0000-1000-8000-000000000001");
  });
  test("posting an email activation should send an email", async () => {
    //WHEN
    await postEmailActivation({ email });

    //THEN
    const lastMail = await getLastMailSent();
    expect(lastMail).toEqual({
      from: "mailfrom@test",
      to: email,
      subject: "Activate your account",
      html: expect.stringMatching(/Click to let Meditation Timer know that this is your email adress/),
    });
  });

  test("posting an email activation should send an activation link", async () => {
    //WHEN
    await postEmailActivation({ email });

    //THEN
    const { html } = await getLastMailSent();
    const link = extractFirstLink(html);
    expect(link).toBe(activationLink);
  });

  test("should activate email when link is clicked once", async () => {
    //GIVEN
    await postEmailActivation({ email });
    //WHEN
    const { body, status } =  await httpGet(activationLink); // Fetch returns a Response object

    // THEN
    expect(status).toBe(200); // Check the status code
    expect(body).toEqual({message: "email activated successfully"}); // Check the response body content
  });
  test("should return error when activation link is clicked twice", async () => {
    //GIVEN
    await postEmailActivation({ email });
    await httpGet(activationLink); // Click once
    //WHEN
    const { body, status } =  await httpGet(activationLink); // Click again

    // THEN
    expect(status).toBe(403); // Check the status code
    expect(body).toEqual({error: "Invalid or expired activation token"}); // Check the response body content
  });
  test("should create user when requested if email is verified", async () => {
    //GIVEN
    const { body:{ createUserToken } } = await postEmailActivation({ email });
    await httpGet(activationLink); // verify email
    //WHEN
    const {body, status} =  await createUser(createUserToken);

    // THEN
    expect(status).toBe(201); // Check the status code
    expect(body.success).to.be.true;
    const userToken = body.userToken;
    expect(userToken).toBeDefined();

    const {userUuid} = fakeTokenService.verify(userToken);
    expect(userUuid).toEqual("10000000-0000-1000-8000-000000000002");
  });
});

function extractFirstLink(text) {
  const regex = /(https?:\/\/[\w\/:\-\=]+)/;
  const match = text.match(regex);
  return match ? match[1] : null;
}

const activationLink = `http://localhost:18000/api/v1/email-activations/activate/${fakeTokenService.createShortLivedToken({
      uuid: "10000000-0000-1000-8000-000000000001",
      scope: ["ACTIVATE"],
    })}`;