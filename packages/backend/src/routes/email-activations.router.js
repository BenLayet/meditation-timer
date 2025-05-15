import express from "express";

export function emailActivationsRouter(emailActivationService) {
  const router = express.Router();

  // Route to send an activation email
  router.post("/", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      console.log(
        `Send an activation email requested: ${JSON.stringify(email)}`
      );
      const emailActivationResponse =
        await emailActivationService.sendActivationEmail(email);
      console.log(`activation email created`);
      res.status(200).json(emailActivationResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to send activation email" });
      console.error(` post activation email error: ${error}`, error);
    }
  });

  // Route to activate an account
  router.get("/activate/:activateToken", async (req, res) => {
    try {
      const { activateToken } = req.params;
      console.log(
        `Activate email requested`
      );
      await emailActivationService.activate(activateToken);
      console.log(
        `email activated successfully`
      );
      res.status(200).json({ message: "email activated successfully" });
    } catch (error) {
      res.status(403).json({ error: "Invalid or expired activation token" });
      console.error(`activate error: ${error}`, error);
    }
  });

  return router;
}
