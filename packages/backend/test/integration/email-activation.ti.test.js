import { postEmailActivation} from "./api.client.js";
import {clearUserData, resetFakeUuidSequence, getLastMailSent} from "./database.admin.js";
import { tokenService } from "../mock.providers.js";

describe("activating emails", () => {

  const email = 'email@example.org';
  afterEach(clearUserData(email));
  beforeEach(resetFakeUuidSequence)

  test("should create email activation", async () => {
    //WHEN
    const {body} = await postEmailActivation({email});

    //THEN
    expect(body).toEqual({createUserToken: expect.any(String)});  
    const {uuid} = tokenService.verify(body.createUserToken);
    expect(uuid).toBe("10000000-0000-1000-8000-000000000001");
    const lastMail = await getLastMailSent();
    expect(lastMail).toEqual({
      sender: "mailfrom@test",
      receipient: email,
      subject: "Activate your account",
      body: expect.stringMatching(/Click to link your mail to your app:/)
    });
  });

});
