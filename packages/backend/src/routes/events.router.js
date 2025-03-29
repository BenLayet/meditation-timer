import express from "express";

export function eventsRouter(eventRepository) {
  const router = express.Router();

  router.post("", async (req, res) => {
    const event = req.body;
    console.log(`Save event requested: ${JSON.stringify(event)}`);
    try {
      const created = await eventRepository.saveEvent(event);
      res.status(201).json(created);
      console.log(`Event created: ${created.id}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error, event);
    }
  });
  router.get("/events", async (req, res) => {
    const userUuid = req.cookies["userUuid"];
    const pageRequest = {
      afterId: req.query.afterId,
      size: req.query.size,
    };
    console.log(`Event page requested for user: ${userUuid}, pageRequest: ${JSON.stringify(pageRequest)}`);
    try {
      const page = await eventRepository.getEventPage(userUuid, pageRequest);
      res.status(200).json(page);
      console.log(`Event page size: ${page.data.length}, nextPage: ${JSON.stringify(page.nextPage)}`);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error(error, userUuid, pageRequest);
    }
  });
  return router;
}
