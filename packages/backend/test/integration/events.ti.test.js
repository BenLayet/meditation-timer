import {getEventPage, postEvent} from "./api.client.js";
import {clearUserData} from "./database.admin.js";

describe("posting and retrieving events", () => {

  const userUuid = 'df32a25b-9c21-4ab7-a41b-b0a1214da304';
  afterEach(clearUserData(userUuid));

  test("should get empty list of events when retrieving first time", async () => {
    //WHEN
    const {body} = await getEventPage(userUuid, 0, 10);

    //THEN
    expect(body).toEqual([]);
  });

  test.skip("should log a event", async () => {
    //GIVEN
    const event = {
      uuid: 'cd045441-af8b-4571-a542-a4413a9baa22',
    };
    //WHEN
    const {status} = await logEvent(event, userUuid);

    //THEN
    expect(status).toBe(201);
  });

  test.skip("should get logged event", async () => {
    //GIVEN
    const event = {
      uuid: 'cd045441-af8b-4571-a542-a4413a9baa22',
      userUuid
    };

    //WHEN
    await logEvent(event, userUuid);
    const {body} = await getEvents(userUuid);

    //THEN
    expect(body).toEqual([event]);
  }); 

});
