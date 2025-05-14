import { postEmailActivation} from "./api.client.js";
import {clearUserData, resetFakeUuidSequence} from "./database.admin.js";
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
  });

});
