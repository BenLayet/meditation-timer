import express from "express";

export function healthRouter(version, environment, logger) {
  const router = express.Router();

  router.get("/", (req, res) => {
    logger.info("get health");
    res.status(200).json({ status: "UP", version, environment });
  });
  return router;
}
