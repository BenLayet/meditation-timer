import {validateDevice} from "../validators/device.validator.js";
import {validateUserUuid} from "../validators/user.validator.js";

export class DeviceRepository {
  constructor(datasource) {
    this.datasource = datasource;
  }
  async saveDevice(userUuid, device) {
    validateUserUuid(userUuid);
    validateDevice(device);
    return this.datasource.begin(async (datasource) => {
      await insertUserIfNecessary(datasource, userUuid);
      return await insertDevice(datasource, userUuid, device);
    });
  }

  async getDevices(userUuid) {
    validateUserUuid(userUuid);
    return this.datasource`
        SELECT * FROM devices
        WHERE user_uuid = ${userUuid};
    `.then(toDevices);
  }

}

const toRow = (result) => result[0]

const toDevice = (row) => ({
  uuid: row.uuid,
  userUuid: row.user_uuid
});
const toDevices = (rows) => rows.map(toDevice);

const insertUserIfNecessary = async (datasource, userUuid) => datasource`
        INSERT INTO users (uuid)
        VALUES (${userUuid})
        ON CONFLICT (uuid) DO NOTHING;`;

const insertDevice = async (datasource, userUuid, device) => datasource`
  INSERT INTO devices (uuid, user_uuid)
  VALUES (${device.uuid}, ${userUuid})
  RETURNING *;
`
    .then(toRow)
    .then(toDevice)
