import { validateNotNull } from "domain/src/models/not-null.validator.js";
import { emailVerificationStatus } from "domain/src/models/email-verification.model.js";

export class EmailVerificationService {
  constructor(
    emailVerificationRepository,
    //TODO mail sender
    emailService,
    tokenService,
    //TODO mail builder
    mailFrom,
    apiProperties,
    logger,
  ) {
    this.emailVerificationRepository = emailVerificationRepository;
    this.emailService = emailService;
    this.tokenService = tokenService;
    this.mailFrom = mailFrom;
    this.apiProperties = apiProperties;
    this.logger = logger;
  }

  async createEmailVerification(email) {
    validateNotNull({ email });
    //TODO one line per action (same level of abstraction)
    let status = emailVerificationStatus.NOT_REQUESTED;
    const { emailVerificationUuid } =
      await this.emailVerificationRepository.createEmailVerification({
        email,
        status,
      });
    this.logger.info(
      `Email verification created with uuid ${emailVerificationUuid}, email ${email}, status ${status}`,
    );
    // Generate a signed token
    const activateToken = await this.tokenService.createShortLivedToken({
      emailVerificationUuid,
      scope: [ACTIVATE_PERMISSION],
    });

    const retrieveEmailVerificationToken =
      await this.tokenService.createShortLivedToken({
        emailVerificationUuid,
        scope: [CHECK_STATUS_PERMISSION],
      });
    const subject = "Activate your account"; //TODO localize
    const { protocol, host, port, basePath } = this.apiProperties;
    const verificationLink = `${protocol}://${host}:${port}${basePath}/email-verifications/activate/${activateToken}`;
    const html = `Click to let Meditation Timer know that this is your email adress: <a href="${verificationLink}" target="_blank">${verificationLink}</a>`;
    const from = this.mailFrom;
    const to = email;
    await this.emailService.sendEmail({ from, to, subject, html });
    status = emailVerificationStatus.REQUESTED;
    this.logger.debug(
      `Sending email to ${email} with verification link ${verificationLink}`,
    );
    await this.emailVerificationRepository.updateEmailVerificationStatus(
      emailVerificationUuid,
      status,
    );

    this.logger.debug(
      `Return retrieveEmailVerificationToken ${retrieveEmailVerificationToken}`,
    );

    return { retrieveEmailVerificationToken, status };
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

      return this.emailVerificationRepository.updateEmailVerificationStatus(
        emailVerificationUuid,
        emailVerificationStatus.VERIFIED,
      );
    } catch (error) {
      this.logger.error("Invalid or expired token:", error);
      throw new Error("Invalid or expired verification token");
    }
  }

  async get(requestedUuid, retrieveEmailVerificationToken) {
    this.logger.info(
      `Check Status requested for emailVerificationUuid: ${requestedUuid}`,
    );
    validateNotNull({ retrieveEmailVerificationToken });
    //TODO check if token is expired and delete email verification if so
    this.tokenService.verify(retrieveEmailVerificationToken);
    const { emailVerificationUuid, scope } = this.tokenService.verify(
      retrieveEmailVerificationToken,
    );
    if (!scope.includes(CHECK_STATUS_PERMISSION)) {
      throw new Error(`Missing permission in token ${CHECK_STATUS_PERMISSION}`);
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
      const userToken = await this.tokenService.createPermanentToken({
        userUuid: emailVerification.userUuid,
      });
      return { status: emailVerification.status, userToken };
    } else {
      this.logger.debug(
        `Email verification with uuid ${emailVerificationUuid} is not verified`,
      );
      return { status: emailVerification.status };
    }
  }
}

const CHECK_STATUS_PERMISSION = "CHECK_STATUS";
const ACTIVATE_PERMISSION = "ACTIVATE";
