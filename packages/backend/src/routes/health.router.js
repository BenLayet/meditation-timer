import express from "express";

export function healthRouter({version, environment}) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log("get health");
    res.status(200).json({ status: "UP", version, environment });
  });
  return router;
}
