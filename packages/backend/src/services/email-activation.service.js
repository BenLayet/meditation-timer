
export class EmailActivationService {
  constructor(
    transactionService,
    emailActivationRepository,
    userRepository,
    emailActivationApiUrl,
    emailService,
    tokenService,
    uuidService
  ) {
    this.transactionService = transactionService;
    this.emailActivationRepository = emailActivationRepository;
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.emailActivationApiUrl = emailActivationApiUrl;
    this.tokenService = tokenService;
    this.uuidService = uuidService;
  }
  async sendActivationEmail(email) {
    const uuid = this.uuidService.createUuid();
    // Generate a signed token
    const activateToken = this.tokenService.createShortLivedToken(
      { uuid, scope: "ACTIVATE" }
    );
    const getStatusToken = this.tokenService.createShortLivedToken(
      { uuid, scope: "GET_STATUS" }
    );
    await this.emailActivationRepository.createEmailActivation({
      uuid,
      email,
      status: "PENDING_VERIFICATION"
    });
    const activationLink = `${this.emailActivationApiUrl}/activate?token=${activateToken}`;
    const subject = "Activate your account"; //TODO localize
    const text = `Click to link your mail to your app: ${activationLink}`;
    await this.emailService.sendEmail({ to: email, subject, text });
    return { getStatusToken };
  }
  async activate(activateToken) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      const { email, uuid } = decoded;
      console.log(`Activating request uuid: ${uuid}`);
      await this.emailActivationRepository.updateEmailActivationStatus(
        uuid,
        "VERIFIED"
      );
      return { success: true, message: "Account activated successfully" };
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
      throw new Error("Invalid or expired activation token");
    }
  }
  async createUser(createUserToken) {
    try {
      const decoded = this.tokenService.verify(createUserToken);
      const { uuid } = decoded;
      console.log(`Create user requested uuid: ${uuid}`);
      this.transactionService.executeInTransaction(async () => {
        const { status, email } =
          await this.emailActivationRepository.getEmailActivation(uuid);
        if (status === "VERIFIED") {
          await this.emailActivationRepository.updateEmailActivationStatus(
            uuid,
            "USER_ALREADY_CREATED"
          );
          const { userUuid } =
            await this.userRepository.createUser(email);
          const userToken = this.tokenService.createPermanentToken({ userUuid });
          return { success: true, userToken };
        } else {
          return { success: false, status };
        }
      });
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
      throw new Error("Invalid or expired status token");
    }
  }
}
