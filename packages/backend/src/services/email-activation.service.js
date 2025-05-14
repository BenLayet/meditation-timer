
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
    const uuid = await this.uuidService.createUuid();
    // Generate a signed token
    const activateToken = await this.tokenService.createShortLivedToken(
      { uuid, scope: [ACTIVATE_PERMISSION] }
    );
    const createUserToken = await  this.tokenService.createShortLivedToken(
      { uuid, scope: [CREATE_USER_PERMISSION] }
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
    return { createUserToken };
  }
  async activate(activateToken) {
    try {
      const  { uuid, scope }  = this.tokenService.verify(activateToken);
      if(!scope.includes(CREATE_USER_PERMISSION)){
        throw new Error(`Missing permission in token ${CREATE_USER_PERMISSION}`);
      }
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
      const  { uuid, scope }  = this.tokenService.verify(createUserToken);
      if(!scope.includes(CREATE_USER_PERMISSION)){
        throw new Error(`Missing permission in token ${CREATE_USER_PERMISSION}`);
      }
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

const CREATE_USER_PERMISSION = "CREATE_USER";
const ACTIVATE_PERMISSION = "ACTIVATE";