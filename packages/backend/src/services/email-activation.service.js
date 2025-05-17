import { validateNotNull } from "../validators/not-null.validator.js";

export class EmailActivationService {
  constructor(
    emailActivationRepository,
    //TODO mail sender
    emailService,
    tokenService,
    //TODO mail builder
    mailFrom,
    apiProperties,
    logger
  ) {
    this.emailActivationRepository = emailActivationRepository;
    this.emailService = emailService;
    this.tokenService = tokenService;
    this.mailFrom = mailFrom;
    this.apiProperties = apiProperties;
    this.logger = logger;
  }
  async sendActivationEmail(email) {
    validateNotNull({email});
    //TODO one line per action (same level of abstraction)
    const { uuid } = await this.emailActivationRepository.createEmailActivation(
      {
        email,
        status: "PENDING_VERIFICATION",
      }
    );
    this.logger.debug(
      `Creating email activation with uuid ${uuid}, email ${email}, status PENDING_VERIFICATION`
    );
    // Generate a signed token
    const activateToken = await this.tokenService.createShortLivedToken({
      uuid,
      scope: [ACTIVATE_PERMISSION],
    });

    const createUserToken = await this.tokenService.createShortLivedToken({
      uuid,
      scope: [CREATE_USER_PERMISSION],
    });
    const subject = "Activate your account"; //TODO localize
    const { protocol, host, port, basePath } = this.apiProperties;
    const activationLink = `${protocol}://${host}:${port}${basePath}/email-activations/activate/${activateToken}`;
    const html = `Click to let Meditation Timer know that this is your email adress: <a href="${activationLink}" target="_blank">${activationLink}</a>`;
    const from = this.mailFrom;
    const to = email;
    await this.emailService.sendEmail({ from, to, subject, html });
    this.logger.debug(
      `Sending email to ${email} with activation link ${activationLink}`
    );
    this.logger.debug(`Return createUserToken ${createUserToken}`);

    return { createUserToken };
  }
  async activate(activateToken) {
    validateNotNull({activateToken});
    try {
      const { uuid: emailActivationUuid, scope } =
        this.tokenService.verify(activateToken);
      if (!scope.includes(ACTIVATE_PERMISSION)) {
        throw new Error(`Missing permission in token ${ACTIVATE_PERMISSION}`);
      }
      this.logger.info(
        `Activating request emailActivationUuid: ${emailActivationUuid}`
      );
      await this.emailActivationRepository.updateEmailActivationStatus(
        emailActivationUuid,
        "VERIFIED"
      );
      return { success: true, message: "Account activated successfully" };
    } catch (error) {
      this.logger.error("Invalid or expired token:", error);
      throw new Error("Invalid or expired activation token");
    }
  }
  async createUser(createUserToken) {
    validateNotNull({createUserToken});
    const { uuid: emailActivationUuid, scope } =
      this.tokenService.verify(createUserToken);
    if (!scope.includes(CREATE_USER_PERMISSION)) {
      throw new Error(`Missing permission in token ${CREATE_USER_PERMISSION}`);
    }
    this.logger.info(
      `Create user requested emailActivationUuid: ${emailActivationUuid}`
    );
    const result =
      await this.emailActivationRepository.markAsUserCreated(
        emailActivationUuid
      );
    if (result.success) {
      const { userUuid } = result;
      this.logger.debug(`User created userUuid: ${userUuid}`);
      const userToken = this.tokenService.createPermanentToken({ userUuid });
      return { success: true, userToken };
    } else {
      this.logger.debug(`User not created status: ${status}`);
      const { status } = result;
      if (status === "VERIFIED") {
        return { success: false, message: "User already created" };
      } else {
        return { success: false, message: "Invalid status" };
      }
    }
  }
}

const CREATE_USER_PERMISSION = "CREATE_USER";
const ACTIVATE_PERMISSION = "ACTIVATE";
