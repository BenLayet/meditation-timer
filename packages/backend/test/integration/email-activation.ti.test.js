import { postEmailActivation } from "./api.client.js";
import {
  clearUserData,
  resetFakeUuidSequence,
  getLastMailSent,
} from "./database.admin.js";
import { tokenService } from "../mock.providers.js";
import { httpGet } from "./http.client.js";

const activationLink = `http://localhost:18000/api/v1/email-activations/activate/${btoa(JSON.stringify(
  {
    life: "short",
    payload: {
      uuid: "10000000-0000-1000-8000-000000000001",
      scope: ["ACTIVATE"],
    },
  }
))}`;
describe("activating emails", () => {
  const email = "email@example.org";
  afterEach(clearUserData(email));
  beforeEach(resetFakeUuidSequence);

  test("posting an email activatin should return a createUserToken", async () => {
    //WHEN
    const { body } = await postEmailActivation({ email });

    //THEN
    expect(body).toEqual({ createUserToken: expect.any(String) });
    const { uuid } = tokenService.verify(body.createUserToken);
    expect(uuid).toBe("10000000-0000-1000-8000-000000000001");
  });
  test("posting an email activatin should send an email", async () => {
    //WHEN
    await postEmailActivation({ email });

    //THEN
    const lastMail = await getLastMailSent();
    expect(lastMail).toEqual({
      sender: "mailfrom@test",
      receipient: email,
      subject: "Activate your account",
      body: expect.stringMatching(/Click to link your mail to your app:/),
    });
  });

  test("posting an email activatin should send an email with an activation link", async () => {
    //WHEN
    await postEmailActivation({ email });

    //THEN
    const { body } = await getLastMailSent();
    const link = extractFirstLink(body);
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
});

function extractFirstLink(text) {
  const regex = /(https?:\/\/[^\s]+)/;
  const match = text.match(regex);
  return match ? match[1] : null;
}
