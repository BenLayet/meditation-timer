import { validateNotNull } from "domain/src/models/not-null.validator.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";

export class EmailVerificationUsecase {
  constructor(
    emailVerificationRepository,
    emailSender,
    tokenService,
    //TODO mail builder
    mailFrom,
    apiProperties,
    logger,
  ) {
    this.emailVerificationRepository = emailVerificationRepository;
    this.emailService = emailSender;
    this.tokenService = tokenService;
    this.mailFrom = mailFrom;
    this.apiProperties = apiProperties;
    this.logger = logger;
  }

  async sendActivationLink(email) {
    validateNotNull({ email });
    //TODO one line per action (same level of abstraction)
    let status = emailVerificationStatus.CREATED;
    let emailVerification =
      await this.emailVerificationRepository.createEmailVerification({
        email,
        status,
      });
    this.logger.info(
      `Email verification created with uuid ${emailVerification.uuid}, email ${email}, status ${status}`,
    );
    // Generate a signed token
    const activateToken = await this.tokenService.createShortLivedToken({
      emailVerificationUuid: emailVerification.uuid,
      scope: [ACTIVATE_PERMISSION],
    });

    const subject = "Activate your account"; //TODO localize
    const { protocol, host, port, basePath } = this.apiProperties;
    const verificationLink = `${protocol}://${host}:${port}${basePath}/email-verifications/activate/${activateToken}`;
    const html = `Click to let Meditation Timer know that this is your email adress: <a href="${verificationLink}" target="_blank">${verificationLink}</a>`;
    const from = this.mailFrom;
    const to = email;
    this.logger.debug(
      `Sending email to ${email} with verification link ${verificationLink}`,
    );
    await this.emailService.sendEmail({ from, to, subject, html });

    //update status to REQUESTED
    status = emailVerificationStatus.ACTIVATION_LINK_SENT;
    emailVerification =
      await this.emailVerificationRepository.updateEmailVerificationStatus(
        emailVerification.uuid,
        status,
      );

    //add retrieve token
    emailVerification.retrieveToken =
      await this.tokenService.createShortLivedToken({
        emailVerificationUuid: emailVerification.uuid,
        scope: [RETRIEVE_PERMISSION],
      });
    this.logger.debug(
      `Return retrieveToken ${emailVerification.retrieveToken}`,
    );

    return emailVerification;
  }

  async activate(activateToken) {
    validateNotNull({ activateToken });
    try {
      const { emailVerificationUuid, scope } =
        await this.tokenService.verify(activateToken);
      if (!scope.includes(ACTIVATE_PERMISSION)) {
        throw new Error(`Missing permission in token ${ACTIVATE_PERMISSION}`);
      }
      this.logger.info(
        `Activating request emailVerificationUuid: ${emailVerificationUuid}`,
      );

      const emailVerification =
        await this.emailVerificationRepository.updateEmailVerificationStatus(
          emailVerificationUuid,
          emailVerificationStatus.VERIFIED,
        );
      this.logger.info(
        `Activating request emailVerificationUuid: ${emailVerification.uuid}. ${emailVerification.userUuid && "userToken created"}`,
      );
      return emailVerification;
    } catch (error) {
      this.logger.error("Invalid or expired token:", error);
      throw new Error("Invalid or expired verification token");
    }
  }

  async get(requestedUuid, retrieveToken) {
    this.logger.info(
      `Check Status requested for emailVerificationUuid: ${requestedUuid}`,
    );
    validateNotNull({ retrieveToken });
    //TODO check if token is expired and delete email verification if so
    this.tokenService.verify(retrieveToken);
    const { emailVerificationUuid, scope } =
      this.tokenService.verify(retrieveToken);
    if (!scope.includes(RETRIEVE_PERMISSION)) {
      throw new Error(`Missing permission in token ${RETRIEVE_PERMISSION}`);
    }
    if (emailVerificationUuid !== requestedUuid) {
      throw new Error(
        `Requested uuid ${requestedUuid} does not match token uuid ${emailVerificationUuid}`,
      );
    }
    const emailVerification = await this.emailVerificationRepository.getByUuid(
      emailVerificationUuid,
    );
    if (!emailVerification) {
      this.logger.debug(
        `No email verification found with uuid ${emailVerificationUuid}`,
      );
      return null;
    }
    if (emailVerification.status === emailVerificationStatus.VERIFIED) {
      this.logger.debug(
        `Email verification with uuid ${emailVerificationUuid} is verified`,
      );
      emailVerification.userToken =
        await this.tokenService.createPermanentToken({
          userUuid: emailVerification.userUuid,
        });
      return emailVerification;
    } else {
      this.logger.debug(
        `Email verification with uuid ${emailVerificationUuid} is not verified`,
      );
      return emailVerification;
    }
  }
}

const RETRIEVE_PERMISSION = "RETRIEVE";
const ACTIVATE_PERMISSION = "ACTIVATE";
