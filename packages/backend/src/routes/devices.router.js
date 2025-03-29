import express from "express";

export function devicesRouter(deviceRepository) {
  const router = express.Router();

  // Register a new device for a user
  router.post("", async (req, res) => {
    const device = req.body;
    const userUuid = req.cookies["userUuid"];
    console.log(`POST device. userUuid: ${userUuid}, device: ${JSON.stringify(device)}`);
    try {
      const created = await deviceRepository.saveDevice(userUuid, device);
      console.log(`Device created: ${created.uuid}`);
      res.status(201).json(created);
    } catch (error) {
      console.error(error,userUuid, device);
      res.status(500).json({error: error.message});
    }
  });

    // Get all devices from user
  router.get("", async (req, res) => {
    const userUuid = req.cookies["userUuid"];
    console.log(`GET devices. userUuid: ${userUuid}`);
    try {
      const devices = await deviceRepository.getDevices(userUuid);

      console.log(`Devices size: ${devices.length}`);
      res.status(200).json(devices);

    } catch (error) {

      console.error(error, userUuid);
      res.status(500).json({error: error.message});
    }
  });
  return router;
}
