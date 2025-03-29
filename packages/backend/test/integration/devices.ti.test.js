import {getDevices, registerDevice} from "./api.client.js";
import {clearUserData} from "./database.admin.js";

describe("Registering and retrieving devices", () => {

  const userUuid = 'df32a25b-9c21-4ab7-a41b-b0a1214da304';
  afterEach(clearUserData(userUuid));

  it("should get empty list of devices when retrieving first time", async () => {
    //WHEN
    const {body} = await getDevices(userUuid);

    //THEN
    expect(body).toEqual([]);
  });

  it("should register a device", async () => {
    //GIVEN
    const device = {
      uuid: 'cd045441-af8b-4571-a542-a4413a9baa22',
    };
    //WHEN
    const {status} = await registerDevice(device, userUuid);

    //THEN
    expect(status).toBe(201);
  });

  it("should get registered device", async () => {
    //GIVEN
    const device = {
      uuid: 'cd045441-af8b-4571-a542-a4413a9baa22',
      userUuid
    };

    //WHEN
    await registerDevice(device, userUuid);
    const {body} = await getDevices(userUuid);

    //THEN
    expect(body).toEqual([device]);
  }); 

});
