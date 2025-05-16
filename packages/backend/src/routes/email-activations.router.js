import express from "express";

export function emailActivationsRouter(emailActivationService, logger) {
  const router = express.Router();

  // Route to send an activation email
  router.post("/", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      logger.info(
        `Send an activation email requested: ${JSON.stringify(email)}`
      );
      const emailActivationResponse =
        await emailActivationService.sendActivationEmail(email);
      logger.info(`activation email created`);
      res.status(201).json(emailActivationResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to send activation email" });
      logger.error(` post activation email error: ${error}`, error);
    }
  });

  // Route to activate an account
  router.get("/activate/:activateToken", async (req, res) => {
    try {
      const { activateToken } = req.params;
      logger.info(`Activate email requested`);
      await emailActivationService.activate(activateToken);
      logger.info(`email activated successfully`);
      res.status(200).json({ message: "email activated successfully" });
    } catch (error) {
      res.status(403).json({ error: "Invalid or expired activation token" });
      logger.error(`activate error: ${error}`, error);
    }
  });

  // Route to create a user
  router.post("/create-user", async (req, res) => {
    try {
      logger.info(`Create user requested`);
      const createUserToken = extractBearerToken(req); // Extract token from Authorization header
      if (!createUserToken) {
        logger.error(`Create user token is required`);
        return res.status(401).json({ error: "Create user token is required" });
      }
      logger.info(`Create user requested`);
      const user = await emailActivationService.createUser(createUserToken);
      logger.info(`user created successfully`);
      res.status(201).json(user);
    } catch (error) {
      res.status(403).json({ error: "Invalid or expired create user token" });
      logger.error(`create user error: ${error}`, error);
    }
  });

  return router;
}
const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header is missing or invalid");
  }
  return authHeader.split(" ")[1]; // Extract the token after "Bearer"
};
