import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import pkg from "jsonwebtoken";
import { extractBearerToken } from "./bearer-token.js";

const { TokenExpiredError } = pkg;

export const sendVerificationLinkHandler = ({
  logger,
  sendVerificationLink,
}) => {
  return async (req, res) => {
    try {
      const { email } = req.body;
      const languageCode = req.headers["accept-language"];
      res.status(201).json(await sendVerificationLink(email, languageCode));
    } catch (error) {
      logger.error(error);
      res.status(500).json({ errorMessage: error?.message });
    }
  };
};

export const verifyEmailAddressHandler = ({
  logger,
  verifyEmailAddress,
  paramProperties,
}) => {
  return async (req, res) => {
    logger.debug(`Verify email requested`);
    const verifyToken =
      req.params[paramProperties.emailVerifications.verifyToken];
    const languageCode =
      req.query[paramProperties.emailVerifications.languageCode] ?? "en";
    logger.debug(`Verify email languageCode: ${languageCode}`);
    try {
      await verifyEmailAddress(verifyToken);
      logger.debug(`email verified successfully`);
      await res.status(302);
      await res.setHeader(
        "Location",
        `/email-verification-succeeded.${languageCode}.html`,
      );
    } catch (error) {
      logger.error(error, `verify error : ${error}`);
      res.status(302);
      res.setHeader(
        "Location",
        `/email-verification-failed.${languageCode}.html`,
      );
    }
  };
};

export const retrieveVerificationHandler = ({
  logger,
  retrieveVerification,
  paramProperties,
}) => {
  return async (req, res) => {
    const emailVerificationUuid =
      req.params[paramProperties.emailVerifications.emailVerificationUuid];
    logger.debug(
      `Check Status requested, for emailVerificationUuid: ${emailVerificationUuid}`,
    );
    let token;
    try {
      token = extractBearerToken(req); // Extract token from Authorization header
    } catch (error) {
      logger.error(error, `token is missing`);
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
