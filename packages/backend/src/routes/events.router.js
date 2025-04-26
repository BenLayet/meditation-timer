import {parsePageRequest} from "./page-request.parser.js";
import express from "express";

export function eventsRouter(eventRepository) {
  const router = express.Router();

  router.post("", async (req, res) => {
    const event = req.body;
    const userUuid = req.cookies["userUuid"];
    console.log(`Save event requested: ${JSON.stringify(event)}, userUuid: ${userUuid}`);
    try {
      const created = await eventRepository.saveEvent(userUuid, event);
      res.status(201).json(created);
      console.log(`Event created: ${created.id}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error, event);
    }
  });
  router.get("", async (req, res) => {
    const userUuid = req.cookies["userUuid"];
    console.log(`Event page requested for user: ${userUuid}`);
    const pageRequest = parsePageRequest(req);
    try {
      const page = await eventRepository.getEventPage(userUuid, pageRequest);
      res.status(200).json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error, userUuid, pageRequest);
    }
  });
  return router;
}
