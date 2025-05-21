import express from "express";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";

export function emailVerificationsRouter(emailVerificationService, logger) {
  const router = express.Router();

  // Route to send verification email
  router.post("/", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      logger.info(
        `Send verification email requested: ${JSON.stringify(email)}`,
      );
      const emailVerificationResponse =
        await emailVerificationService.sendVerificationEmail(email);
      logger.info(`verification email created`);
      res.status(201).json(emailVerificationResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to send verification email" });
      logger.error(`Post verification email error: ${error}`, error);
    }
  });

  // Route to activate an account
  router.get("/activate/:activateToken", async (req, res) => {
    try {
      const { activateToken } = req.params;
      logger.info(`Activate email requested`);
      await emailVerificationService.activate(activateToken);
      logger.debug(`email activated successfully`);
      res.status(200).json({ message: "email activated successfully" });
    } catch (error) {
      res.status(403).json({ error: "Invalid or expired verification token" });
      logger.error(`activate error: ${error}`, error);
    }
  });

  // Route to create a user
  router.get("/:emailVerificationUuid", async (req, res) => {
    try {
      const { emailVerificationUuid } = req.params;
      logger.info(
        `Check Status requested, for emailVerificationUuid: ${emailVerificationUuid}`,
      );
      logger.debug(req.headers);
      const token = extractBearerToken(req); // Extract token from Authorization header
      if (!token) {
        logger.error(`token is missing`);
        return res.status(401).json({ error: "security token is required" });
      }
      const emailVerification = await emailVerificationService.get(
        emailVerificationUuid,
        token,
      );
      res.status(200).json(emailVerification);
    } catch (error) {
      res.status(403).json({ status: emailVerificationStatus.EXPIRED });
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
