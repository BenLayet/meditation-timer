import { validate } from "uuid";
export const validateDeviceUuid = (deviceUuid) => {
  if (!deviceUuid || typeof deviceUuid !== "string")
    throw new Error("Device UUID must be a string");
  if (!validate(deviceUuid))
    throw new Error("Device UUID must be a valid UUID");
};
export const validateDevice = (device) => {
  if (!device) throw new Error("Device cannot be null or undefined");
  validateDeviceUuid(device.uuid);
};
