import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import { validateEmailFormat } from "domain/src/models/email.validator.js";
import {
  VERIFY_PERMISSION,
  RETRIEVE_PERMISSION,
} from "./permissions.constants.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/models/not-null.validator.js";

export const sendVerificationLink = ({
  emailVerificationRepository,
  emailSender,
  tokenService,
  messageBuilder,
  mailFrom,
  apiProperties,
  logger,
}) => {
  validateNotNullObject({ emailVerificationRepository });
  validateNotNullObject({ emailSender });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ messageBuilder });
  validateNotNullObject({ apiProperties });
  validateNotNullObject({ logger });

  validateNotEmptyString({ mailFrom });
  return async (email) => {
    validateEmailFormat(email);

    // 1. save new email verification
    let emailVerification =
      await emailVerificationRepository.createEmailVerification(email);
    logger.info(emailVerification, `Email verification created `);

    // 2. Send email with verification link
    await sendVerificationEmail({
      emailSender,
      tokenService,
      messageBuilder,
      mailFrom,
      apiProperties,
      logger,
    })(emailVerification);
    logger.info(`Verification link sent to ${emailVerification.email}`);

    // 3. update status to REQUESTED
    emailVerification = await markAsVerificationLinkSent({
      emailVerificationRepository,
    })(emailVerification.uuid);

    // 4. add retrieve token
    emailVerification.retrieveToken = await createRetrieveToken({
      tokenService,
    })(emailVerification.uuid);
    logger.debug(`Return retrieveToken ${emailVerification.retrieveToken}`);

    // 5. Return a projection of the email verification object
    return {
      retrieveToken: emailVerification.retrieveToken,
      status: emailVerification.status,
    };
  };
};

const sendVerificationEmail =
  ({
    tokenService,
    apiProperties,
    messageBuilder,
    mailFrom,
    emailSender,
    logger,
  }) =>
  async (emailVerification) => {
    // 1. Generate an verify token
    const verifyToken = await createVerifyToken({ tokenService })(
      emailVerification.uuid,
    );
    logger.debug(`Verify token created: ${verifyToken}`);

    // 2. Build the verification url
    const verificationUrl = buildVerificationUrl({ apiProperties })(
      verifyToken,
    );
    logger.debug(`verificationUrl created: ${verificationUrl}`);

    // 3. Build the verification email
    const messageContent = await messageBuilder.buildMessage(
      "en",
      "verifyAccount",
      {
        verificationUrl,
      },
    );
    logger.debug(messageContent, `messageContent`);

    // 4. Send the email
    await emailSender.sendEmail({
      from: mailFrom,
      to: emailVerification.email,
      subject: messageContent.subject,
      html: messageContent.body,
    });
  };

const createVerifyToken =
  ({ tokenService }) =>
  (emailVerificationUuid) =>
    tokenService.createShortLivedToken({
      emailVerificationUuid,
      scope: [VERIFY_PERMISSION],
    });
const createRetrieveToken =
  ({ tokenService }) =>
  (emailVerificationUuid) =>
    tokenService.createShortLivedToken({
      emailVerificationUuid,
      scope: [RETRIEVE_PERMISSION],
    });

const buildVerificationUrl =
  ({ apiProperties }) =>
  (verifyToken) => {
    const { protocol, host, port, basePath } = apiProperties;
    return `${protocol}://${host}:${port}${basePath}/email-verifications/verify/${verifyToken}`;
  };

const markAsVerificationLinkSent =
  ({ emailVerificationRepository }) =>
  (emailVerificationUuid) =>
    emailVerificationRepository.updateEmailVerificationStatus(
      emailVerificationUuid,
      emailVerificationStatus.VERIFICATION_LINK_SENT,
    );
