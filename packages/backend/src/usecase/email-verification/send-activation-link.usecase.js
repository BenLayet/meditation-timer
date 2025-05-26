import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";
import { validateEmailFormat } from "domain/src/models/email.validator.js";
import {
  ACTIVATE_PERMISSION,
  RETRIEVE_PERMISSION,
} from "./permissions.constants.js";
import {
  validateNotEmptyString,
  validateNotNullObject,
} from "domain/src/models/not-null.validator.js";

export const sendActivationLink = ({
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
    logger.info(`Activation link sent to ${emailVerification.email}`);

    // 3. update status to REQUESTED
    emailVerification = await markAsActivationLinkSent({
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
    // 1. Generate an activate token
    const activateToken = await createActivateToken({ tokenService })(
      emailVerification.uuid,
    );
    logger.debug(`Activate token created: ${activateToken}`);

    // 2. Build the verification url
    const verificationUrl = buildVerificationUrl({ apiProperties })(
      activateToken,
    );
    logger.debug(`verificationUrl created: ${verificationUrl}`);

    // 3. Build the verification email
    const messageContent = await messageBuilder.buildMessage(
      "en",
      "activateAccount",
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

const createActivateToken =
  ({ tokenService }) =>
  (emailVerificationUuid) =>
    tokenService.createShortLivedToken({
      emailVerificationUuid,
      scope: [ACTIVATE_PERMISSION],
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
  (activateToken) => {
    const { protocol, host, port, basePath } = apiProperties;
    return `${protocol}://${host}:${port}${basePath}/email-verifications/activate/${activateToken}`;
  };

const markAsActivationLinkSent =
  ({ emailVerificationRepository }) =>
  (emailVerificationUuid) =>
    emailVerificationRepository.updateEmailVerificationStatus(
      emailVerificationUuid,
      emailVerificationStatus.ACTIVATION_LINK_SENT,
    );
