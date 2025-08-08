import { apiClient } from "./api.client.js";
import { clearUserData } from "./database.admin.js";
import { fakeTokenService, fakeUuidGenerator } from "./test-providers.js";
import {
  createAccountErrorCode,
  loginErrorCode,
} from "domain/src/models/account.model.js";

const userToken = fakeTokenService.createPermanentToken({
  userUuid: "10000000-0000-1000-8000-000000000001",
});

describe("account", () => {
  const login = "login1";
  const password = "password1";
  afterEach(clearUserData(login));

  test("creating an account should return a userToken", async () => {
    //WHEN
    const { body, status } = await apiClient.createAccount({
      body: { login, password },
    });

    //THEN
    expect(status, "status should be 201").toBe(201);
    expect(body).toEqual({
      userToken,
    });
  });

  test("login should return userToken", async () => {
    //GIVEN
    await apiClient.createAccount({
      body: { login, password },
    });
    //WHEN
    const { body, status } = await apiClient.login({
      body: { login, password },
    });

    //THEN
    expect(status, "status should be 200").toBe(200);
    expect(body).toEqual({
      userToken,
    });
  });

  test("creating an account with invalid format should return error", async () => {
    //WHEN
    const { body, status } = await apiClient.createAccount({
      body: { login: "CONTAIN SPACE" },
    });

    //THEN
    expect(status, "status should be 405").toBe(405);
    expect(body).toEqual({
      error:
        "Error: Login must be 3+ characters, excluding space character, but was: CONTAIN SPACE",
      errorCodes: [createAccountErrorCode.INVALID_LOGIN_FORMAT],
    });
  });
  test("creating an account that already exists should return error", async () => {
    //GIVEN
    await apiClient.createAccount({
      body: { login, password },
    });
    fakeUuidGenerator.nextUuid = "10000000-0000-1000-8000-000000000002";
    //WHEN
    const { body, status } = await apiClient.createAccount({
      body: { login, password },
    });

    //THEN
    expect(status, "status should be 409").toBe(409);
    expect(body).toEqual({
      error: "user login1 already exists",
      errorCodes: [createAccountErrorCode.LOGIN_ALREADY_EXISTS],
    });
  });

  test("login when not registered should return error", async () => {
    //WHEN
    const { body, status } = await apiClient.login({
      body: { login, password },
    });

    //THEN
    expect(status, "status should be 401").toBe(401);
    expect(body).toEqual({
      error: "user login1 not found",
      errorCodes: [loginErrorCode.LOGIN_NOT_FOUND],
    });
  });
});
