import {
  validateNotEmptyString,
  validateNotNull,
  validateNotNullObject,
} from "domain/src/lib/assert/not-null.validator.js";
import {
  emailVerificationStatus,
  validateEmailVerification,
} from "domain/src/models/email-verification.model.js";
import { RETRIEVE_PERMISSION } from "./permissions.constants.js";

export const retrieveVerification = ({
  emailVerificationRepository,
  tokenService,
  logger,
}) => {
  validateNotNullObject({ emailVerificationRepository });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ logger });

  return async (emailVerificationUuid, retrieveToken) => {
    validateNotNull({ retrieveToken });
    logger.info(
      `Check Status requested for emailVerificationUuid: ${emailVerificationUuid}`,
    );

    // 1. Verify the token
    try {
      validateTokenAndUuid({ tokenService })(
        retrieveToken,
        emailVerificationUuid,
      );
      logger.info(`retrieveToken verified for uuid: ${emailVerificationUuid}`);
    } catch (error) {
      logger.info(`retrieveToken verification failed: ${error.message}`);
      return { status: emailVerificationStatus.EXPIRED };
    }

    // 2. Retrieve the email verification by UUID
    const emailVerification = await getEmailVerification({
      emailVerificationRepository,
    })(emailVerificationUuid, logger);

    // 3. Check the status of the email verification
    if (emailVerification.status === emailVerificationStatus.VERIFIED) {
      const userToken = await createUserToken({ tokenService })(
        emailVerification.userUuid,
      );
      logger.debug(
        emailVerification,
        `Email verified, userToken generated for ${emailVerificationUuid} `,
      );

      // 4. return a projection of the email verification object
      return { status: emailVerification.status, userToken };
    } else {
      logger.debug(`Email not verified, status: ${emailVerification.status}`);
      // 4. return a projection of the email verification object
      return { status: emailVerification.status };
    }
  };
};

const validateTokenAndUuid =
  ({ tokenService }) =>
  (retrieveToken, requestedUuid) => {
    const { emailVerificationUuid, scope } = tokenService.verify(retrieveToken);
    if (!scope.includes(RETRIEVE_PERMISSION)) {
      throw new Error(`Missing permission in token ${RETRIEVE_PERMISSION}`);
    }
    if (emailVerificationUuid !== requestedUuid) {
      throw new Error(
        `Requested uuid ${requestedUuid} does not match token uuid ${emailVerificationUuid}`,
      );
    }
  };

const getEmailVerification =
  ({ emailVerificationRepository }) =>
  async (emailVerificationUuid, logger) => {
    const emailVerification = await emailVerificationRepository.getByUuid(
      emailVerificationUuid,
    );
    if (!emailVerification) {
      logger.debug(
        `No email verification found with uuid ${emailVerificationUuid}`,
      );
      // expired email verification are not deleted. If not found, it is considered expired
      return { status: emailVerificationStatus.EXPIRED };
    }
    return emailVerification;
  };

const createUserToken =
  ({ tokenService }) =>
  async (userUuid) => {
    validateNotEmptyString({ userUuid });
    return await tokenService.createPermanentToken({
      userUuid,
    });
  };
