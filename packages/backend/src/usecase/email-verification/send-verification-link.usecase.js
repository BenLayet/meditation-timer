import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import { validateEmailFormat } from "domain/src/models/email.validator.js";
import { validateLanguageCode } from "domain/src/models/language.validator.js";
import {
  RETRIEVE_PERMISSION,
  VERIFY_PERMISSION,
} from "./permissions.constants.js";
import { validateNotNullObject } from "domain/src/lib/assert/not-null.validator.js";

export const sendVerificationLink = ({
  emailVerificationRepository,
  emailSender,
  tokenService,
  messageBuilder,
  mailContext,
  logger,
  publicUrlBuilders,
}) => {
  validateNotNullObject({ emailVerificationRepository });
  validateNotNullObject({ emailSender });
  validateNotNullObject({ tokenService });
  validateNotNullObject({ messageBuilder });
  validateNotNullObject({ logger });
  validateNotNullObject({ mailContext });
  validateNotNullObject({ publicUrlBuilders });

  return async (email, languageCode) => {
    validateEmailFormat(email);
    validateLanguageCode(languageCode);

    // 1. save new email verification
    let emailVerification =
      await emailVerificationRepository.createEmailVerification(email);
    logger.info(emailVerification, `Email verification created `);

    // 2. Send email with verification link
    await sendVerificationEmail({
      emailSender,
      tokenService,
      messageBuilder,
      mailContext,
      publicUrlBuilders,
      languageCode,
      logger,
    })(emailVerification);
    logger.info(`Verification link sent to ${emailVerification.email}`);

    // 3. update status to VERIFICATION_LINK_SENT
    emailVerification = await markAsVerificationLinkSent({
      emailVerificationRepository,
    })(emailVerification.uuid);

    // 4. add retrieve token
    emailVerification.retrieveToken = await createRetrieveToken({
      tokenService,
    })(emailVerification.uuid);
    logger.info(`retrieveToken created ${emailVerification.retrieveToken}`);

    // 5. Return a projection of the email verification object
    return {
      retrieveToken: emailVerification.retrieveToken,
      status: emailVerification.status,
      email,
      uuid: emailVerification.uuid,
    };
  };
};

const sendVerificationEmail =
  ({
    tokenService,
    messageBuilder,
    mailContext,
    publicUrlBuilders,
    emailSender,
    languageCode,
    logger,
  }) =>
  async (emailVerification) => {
    // 1. Generate an verify token
    const verifyToken = await createVerifyToken({ tokenService })(
      emailVerification.uuid,
    );
    logger.debug(`Verify token created: ${verifyToken}`);

    // 2. Build the verification url
    const verificationUrl = publicUrlBuilders.verifyEmailAddress({
      verifyToken,
      languageCode,
    });
    logger.debug(`verificationUrl created: ${verificationUrl}`);

    // 3. Build the verification email
    const messageContent = await messageBuilder.buildMessage(
      languageCode,
      "verifyAccount",
      {
        verificationUrl,
      },
    );
    logger.debug(messageContent, `messageContent`);

    // 4. Send the email
    await emailSender.sendEmail({
      from: mailContext.from,
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
  ({ basePath, publicUrl }) =>
  (verifyToken) => {
    return `${publicUrl}${basePath}/email-verifications/verify/${verifyToken}`;
  };

const markAsVerificationLinkSent =
  ({ emailVerificationRepository }) =>
  async (emailVerificationUuid) =>
    await emailVerificationRepository.updateEmailVerificationStatus(
      emailVerificationUuid,
      emailVerificationStatus.VERIFICATION_LINK_SENT,
    );
