import {
  validateNotNull,
  validateNotNullObject,
} from "domain/src/models/not-null.validator.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import { ACTIVATE_PERMISSION } from "./permissions.constants.js";

export const verifyEmailAddress = ({
  emailVerificationRepository,
  tokenService,
  logger,
}) => {
  validateNotNullObject({ emailVerificationRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async (activateToken) => {
    validateNotNull({ activateToken });

    // 1. Validate the activation token
    const emailVerificationUuid = await validateActivationToken({
      tokenService,
      logger,
    })(activateToken);
    logger.info(
      `Activation token verified for emailVerificationUuid: ${emailVerificationUuid}`,
    );

    // 2. Update the email verification status to VERIFIED
    const emailVerification =
      await emailVerificationRepository.updateEmailVerificationStatus(
        emailVerificationUuid,
        emailVerificationStatus.VERIFIED,
      );
    logger.info(
      emailVerification,
      `User #${emailVerification.userUuid} created for emailVerificationUuid #${emailVerification.uuid}`,
    );
  };
};

const validateActivationToken =
  ({ tokenService, logger }) =>
  async (activateToken) => {
    try {
      const { emailVerificationUuid, scope } =
        await tokenService.verify(activateToken);

      if (!scope?.includes(ACTIVATE_PERMISSION)) {
        throw new Error(`Missing permission in token ${ACTIVATE_PERMISSION}`);
      }
      return emailVerificationUuid;
    } catch (error) {
      logger.error("Invalid or expired token:", error);
      throw new Error("Invalid or expired verification token");
    }
  };
