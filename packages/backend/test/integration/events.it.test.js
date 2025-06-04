import { apiClient } from "./api.client.js";
import { clearUserData, createUser } from "./database.admin.js";
import { fakeTokenService } from "./test-providers.js";
import { eventTypes } from "domain/src/models/event.model.js";

const email = "events@it.test";

const userUuid = "df32a25b-9c21-4ab7-a41b-b0a1214da304";
const userToken = fakeTokenService.createPermanentToken({ userUuid });
const headers = { authorization: `Bearer ${userToken}` };

const unknownUserUuid = "df32a25b-9c21-4ab7-a41b-000000000001";
const unknownUserToken = fakeTokenService.createPermanentToken({
  userUuid: unknownUserUuid,
});
const unknownUserHeaders = { authorization: `Bearer ${unknownUserToken}` };
describe("posting and retrieving events", () => {
  beforeEach(createUser(userUuid, email));
  afterEach(clearUserData(email));

  test("should get empty list of events when retrieving first time", async () => {
    //WHEN
    const { body } = await apiClient.getEventPage({ headers });

    //THEN
    expect(body).toEqual({
      entities: [],
      hasNextPage: false,
      lastId: 0,
    });
  });
  test("should get empty list of events when unknown userid ", async () => {
    //WHEN
    const { body } = await apiClient.getEventPage({
      headers: unknownUserHeaders,
    });

    //THEN
    expect(body).toEqual({
      entities: [],
      hasNextPage: false,
      lastId: 0,
    });
  });

  test("should post an event successfully", async () => {
    //GIVEN
    const event = {
      uuid: "cd045441-af8b-4571-a542-a4413a9baa22",
      type: eventTypes.ADD_MEDITATION,
      payload: { startedTimeInSeconds: 123456789, durationInMinutes: 20 },
    };
    //WHEN
    const { status } = await apiClient.postEvent({ body: event, headers });

    //THEN
    expect(status).toBe(201);
  });

  test("should get logged event", async () => {
    //GIVEN
    const event = {
      uuid: "cd045441-af8b-4571-a542-a4413a9baa22",
      type: eventTypes.ADD_MEDITATION,
      payload: { startedTimeInSeconds: 123456789, durationInMinutes: 20 },
    };
    await apiClient.postEvent({ body: event, headers });

    //WHEN
    const { body } = await apiClient.getEventPage({ headers });

    //THEN
    expect(body.entities[0].id).toBeGreaterThan(0);
    const newEventId = body.entities[0].id; //need to be retrieve to allow for parallel tests

    expect(body).toEqual({
      entities: [{ ...event, id: newEventId }],
      hasNextPage: false,
      lastId: newEventId,
    });
  });

  test("should generate error to post an event with unknown user", async () => {
    //GIVEN
    const event = {
      uuid: "cd045441-af8b-4571-a542-a4413a9baa22",
      type: eventTypes.ADD_MEDITATION,
      payload: { startedTimeInSeconds: 123456789, durationInMinutes: 20 },
    };
    //WHEN
    const { status } = await apiClient.postEvent({
      body: event,
      headers: unknownUserHeaders,
    });

    //THEN
    expect(status).toBe(403);
  });
});
