import { postEmailActivation} from "./api.client.js";
import {clearUserData} from "./database.admin.js";
import { checkApiHealth } from './api.client.js';


describe("activating emails", () => {

  const email = 'email@example.org';
  afterEach(clearUserData(email));

  test("should create email activation", async () => {
    //WHEN
    const {body} = await postEmailActivation({email});

    //THEN
    expect(body).toEqual({createUserToken: expect.any(String)});  
    expect(body.createUserToken).toHaveLength(64);
    expect(body.createUserToken).toMatch(/^[a-zA-Z0-9]{64}$/);
  });

});
