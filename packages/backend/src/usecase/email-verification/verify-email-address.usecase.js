import {
  validateNotNull,
  validateNotNullObject,
} from "domain/src/models/not-null.validator.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import { VERIFY_PERMISSION } from "./permissions.constants.js";

export const verifyEmailAddress = ({
  emailVerificationRepository,
  tokenService,
  logger,
}) => {
  validateNotNullObject({ emailVerificationRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async (verifyToken) => {
    validateNotNull({ verifyToken });

    // 1. Validate the verification token
    const emailVerificationUuid = await validateVerificationToken({
      tokenService,
      logger,
    })(verifyToken);
    logger.info(
      `Verification token verified for emailVerificationUuid: ${emailVerificationUuid}`,
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

const validateVerificationToken =
  ({ tokenService, logger }) =>
  async (verifyToken) => {
    try {
      const { emailVerificationUuid, scope } =
        await tokenService.verify(verifyToken);

      if (!scope?.includes(VERIFY_PERMISSION)) {
        throw new Error(`Missing permission in token ${VERIFY_PERMISSION}`);
      }
      return emailVerificationUuid;
    } catch (error) {
      logger.error("Invalid or expired token:", error);
      throw new Error("Invalid or expired verification token");
    }
  };
