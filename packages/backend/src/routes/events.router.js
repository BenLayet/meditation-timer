import {parsePageRequest} from "./page-request.parser.js";
import express from "express";

export function eventsRouter(eventRepository, logger) {
  const router = express.Router();

  router.post("", async (req, res) => {
    const event = req.body;
    const userUuid = req.cookies["userUuid"];
    logger.info(`Save event requested: ${JSON.stringify(event)}, userUuid: ${userUuid}`);
    try {
      const created = await eventRepository.saveEvent(userUuid, event);
      res.status(201).json(created);
      logger.info(`Event created: ${created.id}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
      logger.error(error, event);
    }
  });
  router.get("", async (req, res) => {
    const userUuid = req.cookies["userUuid"];
    logger.info(`Event page requested for user: ${userUuid}`);
    const pageRequest = parsePageRequest(req);
    try {
      const page = await eventRepository.getEventPage(userUuid, pageRequest);
      res.status(200).json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
      logger.error(error, userUuid, pageRequest);
    }
  });
  return router;
}
