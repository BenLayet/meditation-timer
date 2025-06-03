import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import pkg from "jsonwebtoken";

const { TokenExpiredError } = pkg;

export const sendVerificationLinkHandler = ({
  logger,
  sendVerificationLink,
}) => {
  return async (req, res) => {
    try {
      const { email } = req.body;
      res.status(201).json(await sendVerificationLink(email));
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error });
    }
  };
};

export const verifyEmailAddressHandler = ({ logger, verifyEmailAddress }) => {
  return async (req, res) => {
    try {
      const { verifyToken } = req.params;
      logger.debug(`Verify email requested`);
      await verifyEmailAddress(verifyToken);
      logger.debug(`email verified successfully`);
      res.status(200).json({ message: "email verified successfully" });
    } catch (error) {
      logger.error(error, `verify error: ${error}`);
      res.status(403).json({ error: "Invalid or expired verification token" });
    }
  };
};

export const retrieveVerificationHandler = ({
  logger,
  retrieveVerification,
}) => {
  return async (req, res) => {
    const { emailVerificationUuid } = req.params;
    logger.debug(
      `Check Status requested, for emailVerificationUuid: ${emailVerificationUuid}`,
    );
    const token = extractBearerToken(req); // Extract token from Authorization header
    if (!token) {
      logger.error(`token is missing`);
      return res.status(401).json({ error: "security token is required" });
    }
    try {
      const emailVerification = await retrieveVerification(
        emailVerificationUuid,
        token,
      );
      res.status(200).json(emailVerification);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        logger.warn(error, `RetrieveToken expired`);
        return res.status(403).json({
          status: emailVerificationStatus.EXPIRED,
          uuid: emailVerificationUuid,
        });
      }
      logger.error(error, `Unexpected error retrieving email verification`);
      throw error;
    }
  };
};

const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header is missing or invalid");
  }
  return authHeader.split(" ")[1]; // Extract the token after "Bearer"
};
